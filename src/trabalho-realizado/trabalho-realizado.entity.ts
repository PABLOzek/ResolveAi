import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Profissional } from '../profissional/profissional';
import { TrabalhoImagem } from './trabalho-imagem.entity';

@Entity('trabalhos_realizados')
export class TrabalhoRealizado {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  titulo!: string;

  @Column({ type: 'text' })
  descricao!: string;

  @Column({ type: 'text', nullable: true })
  dataRealizacao?: string | null;

  @Column()
  profissionalId!: number;

  @ManyToOne(() => Profissional, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'profissionalId' })
  profissional?: Profissional;

  @OneToMany(() => TrabalhoImagem, (imagem) => imagem.trabalho, { cascade: true })
  imagens?: TrabalhoImagem[];
}
