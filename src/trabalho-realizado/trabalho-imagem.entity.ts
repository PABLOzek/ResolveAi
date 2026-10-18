import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TrabalhoRealizado } from './trabalho-realizado.entity';

@Entity('trabalhos_imagens')
export class TrabalhoImagem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  url!: string;

  @Column({ type: 'text', nullable: true })
  descricao?: string | null;

  @Column({ type: 'integer', default: 0 })
  ordem!: number;

  @Column()
  trabalhoId!: number;

  @ManyToOne(() => TrabalhoRealizado, (trabalho) => trabalho.imagens, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trabalhoId' })
  trabalho?: TrabalhoRealizado;
}
