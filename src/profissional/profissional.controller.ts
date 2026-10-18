import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ProfissionalService } from './profissional.service';
import { CriarProfissionalDto, AtualizarProfissionalDto } from './dto/criar-profissional.dto';

@Controller('profissionais')
export class ProfissionalController {
  constructor(private readonly profissionalService: ProfissionalService) {}

  @Post() criar(@Body() dados: CriarProfissionalDto) { return this.profissionalService.criar(dados); }
  @Get() listar(@Query('nome') nome?: string, @Query('categoriaId') categoriaId?: string) {
    if (categoriaId !== undefined && !/^\d+$/.test(categoriaId)) return this.profissionalService.listar(nome, Number.NaN);
    return this.profissionalService.listar(nome, categoriaId === undefined ? undefined : Number(categoriaId));
  }
  @Get(':id') buscarPorId(@Param('id', ParseIntPipe) id: number) { return this.profissionalService.buscarPorId(id); }
  @Put(':id') atualizar(@Param('id', ParseIntPipe) id: number, @Body() dados: AtualizarProfissionalDto) { return this.profissionalService.atualizar(id, dados); }
  @Delete(':id') async remover(@Param('id', ParseIntPipe) id: number) { await this.profissionalService.remover(id); return { mensagem: 'Perfil profissional removido.' }; }
}
