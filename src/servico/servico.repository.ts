import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servico } from './servico';

@Injectable()
export class ServicoRepository {

  // Conecta o repository do serviço ao TypeORM
  constructor(
    @InjectRepository(Servico)
    private readonly repositorio: Repository<Servico>,
  ) {}

  // Salva um novo serviço no banco
  async criar(servico: Partial<Servico>): Promise<Servico> {
    const novo = this.repositorio.create({
      nome: servico.nome,
      descricao: servico.descricao,
      categoriaId: servico.categoriaId,
      profissionalId: servico.profissionalId,
    });

    return this.repositorio.save(novo);
  }

  // Busca um serviço pelo ID
  async buscarPorId(id: number): Promise<Servico | null> {
    return this.repositorio.findOne({ where: { id }, relations: { categoria: true, profissional: true } });
  }

  // Lista todos os serviços
  async listar(): Promise<Servico[]> {
    return this.repositorio.find({ relations: { categoria: true, profissional: true }, order: { id: 'ASC' } });
  }

  // Lista os serviços de um profissional
  async listarPorProfissional(
    profissionalId: number,
  ): Promise<Servico[]> {
    return this.repositorio.find({
      where: { profissionalId },
      relations: { categoria: true },
    });
  }

  // Lista os serviços de uma categoria
  async listarPorCategoria(
    categoriaId: number,
  ): Promise<Servico[]> {
    return this.repositorio.find({
      where: { categoriaId },
      relations: { profissional: true },
    });
  }

  // Atualiza os dados de um serviço
  async atualizar(
    id: number,
    servico: Partial<Servico>,
  ): Promise<Servico | null> {
    await this.repositorio.update(id, {
      nome: servico.nome,
      descricao: servico.descricao,
      categoriaId: servico.categoriaId,
      profissionalId: servico.profissionalId,
    });

    return this.buscarPorId(id);
  }

  // Remove um serviço pelo ID
  async remover(id: number): Promise<void> {
    await this.repositorio.delete(id);
  }
}