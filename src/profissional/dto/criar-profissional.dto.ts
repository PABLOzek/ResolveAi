export class CriarProfissionalDto {
  usuarioId!: number;
  cidade!: string;
  telefone?: string | null;
  whatsapp?: string | null;
  apresentacao?: string | null;
  fotoPerfil?: string | null;
}

export class AtualizarProfissionalDto {
  cidade?: string;
  telefone?: string | null;
  whatsapp?: string | null;
  apresentacao?: string | null;
  fotoPerfil?: string | null;
}
