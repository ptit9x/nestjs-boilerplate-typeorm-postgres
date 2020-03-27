import { Entity, Column, PrimaryGeneratedColumn, Index, ManyToOne } from 'typeorm';
import { Role } from 'src/role/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @Column('int', { default: 0 })
  status: number;

  @ManyToOne(type=> Role, role => role.id)
  role: Role;
}
