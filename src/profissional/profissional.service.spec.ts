import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ProfissionalService } from './profissional.service';

describe('ProfissionalService', () => {
  let service: ProfissionalService;
  const profissionais = {
    criar: jest.fn(), buscarPorId: jest.fn(), buscarPorUsuarioId: jest.fn(),
    listar: jest.fn(), pesquisar: jest.fn(), atualizar: jest.fn(), remover: jest.fn(),
  };
  const usuarios = { buscarPorId: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ProfissionalService(profissionais as any, usuarios as any);
  });

  it('impede criar perfil para usuário inexistente', async () => {
    usuarios.buscarPorId.mockResolvedValue(null);
    await expect(service.criar({ usuarioId: 999, cidade: 'Ceres' })).rejects.toBeInstanceOf(BadRequestException);
    expect(profissionais.criar).not.toHaveBeenCalled();
  });

  it('impede mais de um perfil para a mesma conta', async () => {
    usuarios.buscarPorId.mockResolvedValue({ id: 1, nome: 'Ana', email: 'ana@example.com' });
    profissionais.buscarPorUsuarioId.mockResolvedValue({ id: 4, usuarioId: 1 });
    await expect(service.criar({ usuarioId: 1, cidade: 'Ceres' })).rejects.toBeInstanceOf(BadRequestException);
  });

  it('retorna 404 para profissional inexistente', async () => {
    profissionais.buscarPorId.mockResolvedValue(null);
    await expect(service.buscarPorId(999)).rejects.toBeInstanceOf(NotFoundException);
  });
});
