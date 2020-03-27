import { Entity, Column, PrimaryGeneratedColumn, Index, ManyToOne } from 'typeorm';
import { Role } from '../role/role.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  name: string;

  @Column('text')
  description: string;
}
