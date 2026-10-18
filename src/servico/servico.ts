import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from '../categoria/categoria';
import { Profissional } from '../profissional/profissional';

@Entity('servicos')
export class Servico {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column({ type: 'text' })
  descricao!: string;

  @Column()
  categoriaId!: number;

  @ManyToOne(() => Categoria, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'categoriaId' })
  categoria?: Categoria;

  @Column()
  profissionalId!: number;

  @ManyToOne(() => Profissional, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'profissionalId' })
  profissional?: Profissional;
}
