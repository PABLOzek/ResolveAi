export class CriarServicoDto {
  nome!: string;
  descricao!: string;
  categoriaId!: number;
  profissionalId!: number;
}
export class AtualizarServicoDto {
  nome?: string;
  descricao?: string;
  categoriaId?: number;
  profissionalId?: number;
}
