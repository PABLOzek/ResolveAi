import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CriarTrabalhoRealizadoDto } from './dto/trabalho-realizado.dto';
import { TrabalhoRealizadoService } from './trabalho-realizado.service';

@Controller('trabalhos')
export class TrabalhoRealizadoController {
  constructor(private readonly service: TrabalhoRealizadoService) {}
  @Get() listar() { return this.service.listarTodos(); }
  @Post() criar(@Body() dados: CriarTrabalhoRealizadoDto) { return this.service.criar(dados); }
  @Get('profissional/:profissionalId') listarPorProfissional(@Param('profissionalId', ParseIntPipe) id: number) { return this.service.listarPorProfissional(id); }
  @Delete(':id') async remover(@Param('id', ParseIntPipe) id: number) { await this.service.remover(id); return { mensagem: 'Trabalho removido.' }; }
}
