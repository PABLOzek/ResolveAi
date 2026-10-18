import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profissional } from '../profissional/profissional';
import { TrabalhoRealizado } from './trabalho-realizado.entity';
import { TrabalhoImagem } from './trabalho-imagem.entity';
import { TrabalhoRealizadoRepository } from './trabalho-realizado.repository';
import { TrabalhoRealizadoService } from './trabalho-realizado.service';
import { TrabalhoRealizadoController } from './trabalho-realizado.controller';

@Module({ imports: [TypeOrmModule.forFeature([TrabalhoRealizado, TrabalhoImagem, Profissional])], controllers: [TrabalhoRealizadoController], providers: [TrabalhoRealizadoRepository, TrabalhoRealizadoService] })
export class TrabalhoRealizadoModule {}
