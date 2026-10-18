import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profissional } from '../profissional/profissional';
import { TrabalhoRealizadoRepository } from './trabalho-realizado.repository';
import { CriarTrabalhoRealizadoDto } from './dto/trabalho-realizado.dto';
import { persistImage } from '../common/image-storage';

@Injectable()
export class TrabalhoRealizadoService {
  constructor(
    private readonly trabalhos: TrabalhoRealizadoRepository,
    @InjectRepository(Profissional) private readonly profissionais: Repository<Profissional>,
  ) {}

  async criar(d: CriarTrabalhoRealizadoDto) {
    if (!d.titulo?.trim() || !d.descricao?.trim()) throw new BadRequestException('Título e descrição são obrigatórios.');
    if (!Number.isInteger(d.profissionalId) || d.profissionalId <= 0) throw new BadRequestException('profissionalId deve ser um inteiro positivo.');
    if (!(await this.profissionais.findOneBy({ id: d.profissionalId }))) throw new BadRequestException('O profissional informado não existe.');
    if ((d.imagens ?? []).length > 5) throw new BadRequestException('Cada trabalho pode conter no máximo 5 fotografias.');
    const imagens = (d.imagens ?? []).map((i, index) => {
      if (!i.url?.trim()) throw new BadRequestException('Cada imagem precisa ser informada.');
      return { url: persistImage(i.url.trim(), 'trabalhos'), descricao: i.descricao?.trim() || null, ordem: Number.isInteger(i.ordem) && i.ordem! >= 0 ? i.ordem! : index };
    });
    return this.trabalhos.criar({ titulo: d.titulo.trim(), descricao: d.descricao.trim(), dataRealizacao: d.dataRealizacao?.trim() || null, profissionalId: d.profissionalId, imagens: imagens as any });
  }
  async listarTodos() { return this.trabalhos.listarTodos(); }
  async listarPorProfissional(id: number) {
    if (!Number.isInteger(id) || id <= 0) throw new BadRequestException('ID do profissional inválido.');
    if (!(await this.profissionais.findOneBy({ id }))) throw new NotFoundException('Profissional não encontrado.');
    return this.trabalhos.listarPorProfissional(id);
  }
  async remover(id: number) {
    const t = await this.trabalhos.buscarPorId(id);
    if (!t) throw new NotFoundException('Trabalho realizado não encontrado.');
    await this.trabalhos.remover(id);
  }
}
