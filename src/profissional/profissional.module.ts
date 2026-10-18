import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profissional } from './profissional';
import { ProfissionalController } from './profissional.controller';
import { ProfissionalService } from './profissional.service';
import { ProfissionalRepository } from './profissional.repository';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({ imports: [TypeOrmModule.forFeature([Profissional]), UsuarioModule], controllers: [ProfissionalController], providers: [ProfissionalService, ProfissionalRepository], exports: [ProfissionalRepository, ProfissionalService] })
export class ProfissionalModule {}
