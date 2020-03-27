import { Entity, Column, PrimaryGeneratedColumn, Index, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  name: string;

  @Column('text')
  description: string;

  @OneToMany(type => User, user => user.id)
  users: User[];
}
