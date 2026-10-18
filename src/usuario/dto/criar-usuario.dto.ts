export class CriarUsuarioDto {
  nome!: string;
  email!: string;
  cpf!: string;
  telefone?: string | null;
  data_nascimento?: string | null;
}

export class AtualizarUsuarioDto {
  nome?: string;
  email?: string;
  cpf?: string;
  telefone?: string | null;
  data_nascimento?: string | null;
}
