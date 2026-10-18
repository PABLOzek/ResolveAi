import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  const porta = process.env.PORT ?? 3000;
  const uploadRoot = process.env.UPLOADS_DIR
    ? (process.env.UPLOADS_DIR.startsWith('/') ? process.env.UPLOADS_DIR : join(process.cwd(), process.env.UPLOADS_DIR))
    : join(process.cwd(), 'uploads');

  if (!existsSync(uploadRoot)) mkdirSync(uploadRoot, { recursive: true });
  app.use(express.json({ limit: '25mb' }));
  app.use('/uploads', express.static(uploadRoot, { fallthrough: false, maxAge: '1h' }));
  app.enableCors({
    origin: process.env.FRONTEND_ORIGIN?.split(',') ?? true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  const host = process.env.HOST ?? '127.0.0.1';
  await app.listen(porta, host);
  console.log(`Resolve Aí API disponível em http://${host}:${porta}`);
  console.log(`Arquivos de imagem persistidos em ${uploadRoot}`);
}

void bootstrap();
