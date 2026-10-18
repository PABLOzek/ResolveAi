import {
  Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from '../usuario/usuario';
import { Servico } from '../servico/servico';
import { TrabalhoRealizado } from '../trabalho-realizado/trabalho-realizado.entity';

@Entity('profissionais')
export class Profissional {
  @PrimaryGeneratedColumn()
  id!: number;

  // Campos legados mantidos durante a transição dos dados existentes.
  // Novos perfis usam os dados da conta Usuario como fonte principal.
  @Column({ nullable: true })
  nome?: string | null;

  @Column({ nullable: true, unique: true })
  email?: string | null;

  @Column({ nullable: true })
  telefone?: string | null;

  @Column()
  cidade!: string;

  @Column({ type: 'text', nullable: true })
  apresentacao?: string | null;

  @Column({ type: 'text', nullable: true })
  fotoPerfil?: string | null;

  @Column({ type: 'text', nullable: true })
  whatsapp?: string | null;

  // Campo legado: a categoria do perfil passa a ser determinada pelos serviços.
  @Column({ nullable: true })
  categoriaId?: number | null;

  @Column({ nullable: true, unique: true })
  usuarioId?: number | null;

  @OneToMany(() => Servico, (servico) => servico.profissional)
  servicos?: Servico[];

  @OneToMany(() => TrabalhoRealizado, (trabalho) => trabalho.profissional)
  trabalhos?: TrabalhoRealizado[];

  @OneToOne(() => Usuario, (usuario) => usuario.profissional, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'usuarioId' })
  usuario?: Usuario | null;
}
