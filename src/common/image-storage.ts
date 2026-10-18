import { BadRequestException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const MIME_EXTENSIONS: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
};

const MAX_IMAGE_BYTES = 3 * 1024 * 1024;

/**
 * Persiste imagens enviadas como data URL em uma pasta local estável.
 * URLs HTTP(S) existentes são aceitas para compatibilidade com registros antigos.
 */
export function persistImage(value: string, folder = 'uploads'): string {
  const input = value?.trim();
  if (!input) throw new BadRequestException('A imagem não foi informada.');

  if (/^https?:\/\//i.test(input)) {
    return input;
  }

  const match = input.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=\r\n]+)$/i);
  if (!match) {
    throw new BadRequestException('Imagem inválida. Use JPG, PNG ou WEBP.');
  }

  const mime = match[1].toLowerCase();
  const buffer = Buffer.from(match[2].replace(/\s/g, ''), 'base64');
  if (!buffer.length || buffer.length > MAX_IMAGE_BYTES) {
    throw new BadRequestException('Cada imagem deve ter no máximo 3 MB.');
  }

  // Valida assinaturas reais para não confiar apenas no MIME informado pelo navegador.
  const signatures: Record<string, (b: Buffer) => boolean> = {
    'image/jpeg': (b) => b.length > 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
    'image/png': (b) => b.length > 8 && b.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])),
    'image/webp': (b) => b.length > 12 && b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP',
  };
  if (!signatures[mime](buffer)) {
    throw new BadRequestException('O conteúdo do arquivo não corresponde a uma imagem válida.');
  }

  const root = process.env.UPLOADS_DIR
    ? (process.env.UPLOADS_DIR.startsWith('/') ? process.env.UPLOADS_DIR : join(process.cwd(), process.env.UPLOADS_DIR))
    : join(process.cwd(), 'uploads');
  const targetFolder = join(root, folder);
  if (!existsSync(targetFolder)) mkdirSync(targetFolder, { recursive: true });

  const filename = `${randomUUID()}${MIME_EXTENSIONS[mime]}`;
  writeFileSync(join(targetFolder, filename), buffer, { flag: 'wx' });
  return `/uploads/${folder}/${filename}`;
}
