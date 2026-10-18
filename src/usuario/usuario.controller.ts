import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';

import { Usuario } from './usuario';
import { CriarUsuarioDto, AtualizarUsuarioDto } from './dto/criar-usuario.dto';

import { UsuarioService } from './usuario.service';

// Controller responsável pelos usuários
@Controller('usuarios')
export class UsuarioController {

  constructor(private readonly usuarioService: UsuarioService) {}

  // Cadastra um novo usuário
  @Post()
  async criar(@Body() dados: CriarUsuarioDto) { return this.respostaSegura(await this.usuarioService.criar(dados as Usuario)); }

  // Lista todos os usuários
  @Get()
  async listar() { return (await this.usuarioService.listar()).map((u) => this.respostaSegura(u)); }

  // Busca um usuário pelo ID
  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.buscarPorId(id).then((u) => this.respostaSegura(u));
  }

  // Atualiza os dados de um usuário
  @Put(':id')
  async atualizar(@Param('id', ParseIntPipe) id: number, @Body() dados: AtualizarUsuarioDto) {
    const atual = await this.usuarioService.buscarPorId(id);
    await this.usuarioService.atualizar(id, { ...atual, ...dados } as Usuario);
    return this.usuarioService.buscarPorId(id).then((u) => this.respostaSegura(u));
  }

  // Remove um usuário
  @Delete(':id')
  async remover(@Param('id', ParseIntPipe) id: number) {
    await this.usuarioService.remover(id);

    return { mensagem: 'Usuário removido.' };
  }


  private respostaSegura(u: Usuario) {
    return { id: u.id, nome: u.nome, email: u.email, telefone: u.telefone ?? null, data_nascimento: u.data_nascimento ?? null };
  }

}