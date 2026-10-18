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

import { CriarCategoriaDto, AtualizarCategoriaDto } from './dto/categoria.dto';
import { CategoriaService } from './categoria.service';

// Controller responsável pelas categorias
@Controller('categorias')
export class CategoriaController {
  constructor(
    private readonly categoriaService: CategoriaService,
  ) {}

  // Cadastra uma nova categoria
  @Post()
  criar(@Body() dados: CriarCategoriaDto) {
    return this.categoriaService.criar(dados);
  }

  // Lista todas as categorias
  @Get()
  listar() {
    return this.categoriaService.listar();
  }

  // Busca uma categoria pelo ID
  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.categoriaService.buscarPorId(id);
  }

  // Atualiza os dados de uma categoria
  @Put(':id')
  atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dados: AtualizarCategoriaDto,
  ) {
    return this.categoriaService.atualizar(id, dados);
  }

  // Remove uma categoria
  @Delete(':id')
  remover(@Param('id', ParseIntPipe) id: number) {
    return this.categoriaService.remover(id);
  }
}