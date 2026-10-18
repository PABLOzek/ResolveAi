export class CriarTrabalhoImagemDto {
  url!: string;
  descricao?: string | null;
  ordem?: number;
}

export class CriarTrabalhoRealizadoDto {
  titulo!: string;
  descricao!: string;
  dataRealizacao?: string | null;
  profissionalId!: number;
  imagens?: CriarTrabalhoImagemDto[];
}
