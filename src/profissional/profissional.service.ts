import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Profissional } from './profissional';
import { ProfissionalRepository } from './profissional.repository';
import { UsuarioRepository } from '../usuario/usuario.repository';
import { persistImage } from '../common/image-storage';

@Injectable()
export class ProfissionalService {
  constructor(
    private readonly profissionalRepository: ProfissionalRepository,
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async criar(dados: { usuarioId: number; cidade: string; telefone?: string | null; whatsapp?: string | null; apresentacao?: string | null; fotoPerfil?: string | null }): Promise<object> {
    if (!Number.isInteger(dados.usuarioId) || dados.usuarioId <= 0) throw new BadRequestException('usuarioId deve ser um inteiro positivo.');
    if (!dados.cidade?.trim()) throw new BadRequestException('A cidade do profissional é obrigatória.');
    const usuario = await this.usuarioRepository.buscarPorId(dados.usuarioId);
    if (!usuario) throw new BadRequestException('O usuário informado não existe.');
    if (await this.profissionalRepository.buscarPorUsuarioId(dados.usuarioId)) throw new BadRequestException('Esta conta já possui um perfil profissional.');
    const profissional = await this.profissionalRepository.criar({
      usuarioId: usuario.id, usuario, nome: usuario.nome, email: null,
      telefone: dados.telefone?.trim() || usuario.telefone || null,
      whatsapp: dados.whatsapp?.trim() || dados.telefone?.trim() || usuario.telefone || null,
      apresentacao: dados.apresentacao?.trim() || null,
      fotoPerfil: dados.fotoPerfil ? persistImage(dados.fotoPerfil, 'profissionais') : null,
      cidade: dados.cidade.trim(), categoriaId: null,
    });
    return this.publico(profissional);
  }

  async listar(nome?: string, categoriaId?: number): Promise<object[]> {
    if (categoriaId !== undefined && (!Number.isInteger(categoriaId) || categoriaId <= 0)) throw new BadRequestException('categoriaId deve ser um inteiro positivo.');
    const profissionais = nome?.trim() || categoriaId !== undefined
      ? await this.profissionalRepository.pesquisar(nome, categoriaId)
      : await this.profissionalRepository.listar();
    return profissionais.map((p) => this.publico(p));
  }

  async buscarPorId(id: number): Promise<object> {
    if (!Number.isInteger(id) || id <= 0) throw new BadRequestException('ID do profissional inválido.');
    const p = await this.profissionalRepository.buscarPorId(id);
    if (!p) throw new NotFoundException('Profissional não encontrado.');
    return this.publico(p);
  }

  async atualizar(id: number, dados: { cidade?: string; telefone?: string | null; whatsapp?: string | null; apresentacao?: string | null; fotoPerfil?: string | null }): Promise<object> {
    await this.buscarEntidade(id);
    if (dados.cidade !== undefined && !dados.cidade.trim()) throw new BadRequestException('A cidade não pode ficar vazia.');
    const p = await this.profissionalRepository.atualizar(id, {
      ...(dados.cidade !== undefined ? { cidade: dados.cidade.trim() } : {}),
      ...(dados.telefone !== undefined ? { telefone: dados.telefone?.trim() || null } : {}),
      ...(dados.whatsapp !== undefined ? { whatsapp: dados.whatsapp?.trim() || null } : {}),
      ...(dados.apresentacao !== undefined ? { apresentacao: dados.apresentacao?.trim() || null } : {}),
      ...(dados.fotoPerfil !== undefined ? { fotoPerfil: dados.fotoPerfil ? persistImage(dados.fotoPerfil, 'profissionais') : null } : {}),
    });
    if (!p) throw new NotFoundException('Profissional não encontrado.');
    return this.publico(p);
  }

  async remover(id: number): Promise<void> { await this.buscarEntidade(id); await this.profissionalRepository.remover(id); }

  private async buscarEntidade(id: number): Promise<Profissional> {
    if (!Number.isInteger(id) || id <= 0) throw new BadRequestException('ID do profissional inválido.');
    const p = await this.profissionalRepository.buscarPorId(id);
    if (!p) throw new NotFoundException('Profissional não encontrado.');
    return p;
  }

  private publico(p: Profissional): object {
    return {
      id: p.id,
      nome: p.usuario?.nome ?? p.nome ?? 'Profissional',
      cidade: p.cidade,
      apresentacao: p.apresentacao ?? null,
      fotoPerfil: p.fotoPerfil ?? null,
      whatsapp: p.whatsapp ?? p.telefone ?? p.usuario?.telefone ?? null,
      telefone: p.telefone ?? p.usuario?.telefone ?? null,
      usuarioId: p.usuarioId ?? null,
      servicos: (p.servicos ?? []).map((s) => ({ id: s.id, nome: s.nome, descricao: s.descricao, categoria: s.categoria ? { id: s.categoria.id, nome: s.categoria.nome } : { id: s.categoriaId } })),
      trabalhos: (p.trabalhos ?? []).map((t) => ({ id: t.id, titulo: t.titulo, descricao: t.descricao, dataRealizacao: t.dataRealizacao ?? null, imagens: (t.imagens ?? []).sort((a, b) => a.ordem - b.ordem).map((i) => ({ id: i.id, url: i.url, descricao: i.descricao ?? null, ordem: i.ordem })) })),
    };
  }
}
