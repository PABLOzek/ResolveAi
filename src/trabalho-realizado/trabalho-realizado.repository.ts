import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrabalhoRealizado } from './trabalho-realizado.entity';

@Injectable()
export class TrabalhoRealizadoRepository {
  constructor(@InjectRepository(TrabalhoRealizado) private readonly repo: Repository<TrabalhoRealizado>) {}
  criar(dados: Partial<TrabalhoRealizado>): Promise<TrabalhoRealizado> { return this.repo.save(this.repo.create(dados)); }
  listarTodos(): Promise<TrabalhoRealizado[]> { return this.repo.find({ relations: { imagens: true }, order: { id: 'DESC' } }); }
  listarPorProfissional(profissionalId: number): Promise<TrabalhoRealizado[]> { return this.repo.find({ where: { profissionalId }, relations: { imagens: true }, order: { id: 'DESC' } }); }
  buscarPorId(id: number): Promise<TrabalhoRealizado | null> { return this.repo.findOne({ where: { id }, relations: { imagens: true } }); }
  async atualizar(id: number, dados: Partial<TrabalhoRealizado>): Promise<TrabalhoRealizado | null> { await this.repo.update(id, dados); return this.buscarPorId(id); }
  async remover(id: number): Promise<void> { await this.repo.delete(id); }
}
