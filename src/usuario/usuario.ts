import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profissional } from '../profissional/profissional';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'text' })
  nome!: string;

  @Column({ type: 'text', unique: true })
  email!: string;

  @Column({ type: 'text', unique: true })
  cpf!: string;

  @Column({ type: 'text', nullable: true })
  telefone?: string | null;

  @Column({ type: 'text', nullable: true })
  data_nascimento?: string | null;

  @OneToOne(() => Profissional, (profissional) => profissional.usuario)
  profissional?: Profissional | null;
}
