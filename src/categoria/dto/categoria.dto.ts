export class CriarCategoriaDto { nome!: string; sigla!: string; descricao!: string | null; }
export class AtualizarCategoriaDto { nome?: string; sigla?: string; descricao?: string | null; }
