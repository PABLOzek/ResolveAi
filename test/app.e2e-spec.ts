import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { existsSync, unlinkSync } from 'node:fs';

describe('Resolve Aí API (e2e)', () => {
  let app: INestApplication<App>;
  const bancoTeste = join(tmpdir(), `resolve-ai-e2e-${process.pid}.sqlite`);

  beforeAll(() => { process.env.DB_PATH = bancoTeste; });

  beforeEach(async () => {
    const { AppModule } = await import('../src/app.module');
    const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /app/2/3 responde com a soma', () => {
    return request(app.getHttpServer()).get('/app/2/3').expect(200).expect(5);
  });

  afterEach(async () => { await app.close(); });
  afterAll(() => {
    delete process.env.DB_PATH;
    for (const suffix of ['', '-shm', '-wal']) {
      const file = `${bancoTeste}${suffix}`;
      if (existsSync(file)) unlinkSync(file);
    }
  });
});
