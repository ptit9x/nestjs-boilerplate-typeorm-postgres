import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ length: 512 })
  password: string;

  @Column({ length: 512 })
  salt: string;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @Column('int')
  status: number;
}
