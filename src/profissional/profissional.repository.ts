import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profissional } from './profissional';

@Injectable()
export class ProfissionalRepository {
  constructor(@InjectRepository(Profissional) private readonly repositorio: Repository<Profissional>) {}

  criar(dados: Partial<Profissional>): Promise<Profissional> {
    return this.repositorio.save(this.repositorio.create(dados));
  }
  buscarPorId(id: number): Promise<Profissional | null> {
    return this.repositorio.findOne({ where: { id }, relations: { usuario: true, servicos: { categoria: true }, trabalhos: { imagens: true } } });
  }
  buscarPorUsuarioId(usuarioId: number): Promise<Profissional | null> {
    return this.repositorio.findOneBy({ usuarioId });
  }
  buscarPorEmail(email: string): Promise<Profissional | null> {
    return this.repositorio.findOneBy({ email });
  }
  listar(): Promise<Profissional[]> {
    return this.repositorio.find({ relations: { usuario: true, servicos: { categoria: true }, trabalhos: { imagens: true } }, order: { id: 'ASC' } });
  }
  pesquisar(nome?: string, categoriaId?: number): Promise<Profissional[]> {
    const query = this.repositorio.createQueryBuilder('p')
      .leftJoinAndSelect('p.usuario', 'u')
      .leftJoinAndSelect('p.servicos', 's')
      .leftJoinAndSelect('s.categoria', 'categoria')
      .leftJoinAndSelect('p.trabalhos', 'trabalho')
      .leftJoinAndSelect('trabalho.imagens', 'imagem');
    if (nome?.trim()) query.andWhere('(LOWER(COALESCE(u.nome, p.nome, \'\')) LIKE LOWER(:nome))', { nome: `%${nome.trim()}%` });
    if (categoriaId !== undefined) query.andWhere('s.categoriaId = :categoriaId', { categoriaId });
    return query.distinct(true).orderBy('p.id', 'ASC').getMany();
  }
  async atualizar(id: number, dados: Partial<Profissional>): Promise<Profissional | null> {
    await this.repositorio.update(id, dados);
    return this.buscarPorId(id);
  }
  async remover(id: number): Promise<void> { await this.repositorio.delete(id); }
}
