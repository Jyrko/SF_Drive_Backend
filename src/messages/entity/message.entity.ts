import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../../auth/entities/user.entity';

@Entity('message')
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => User)
  toUser: User;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  body: string;

  @Column({ update: false })
  createdAt: number = Date.now();
}
