import { Column, Entity, ManyToOne, ObjectID, ObjectIdColumn } from 'typeorm';

import { User } from '../../auth/entities/user.entity';

@Entity('messages')
export class MessageEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column(() => User)
  user: User;

  @Column(() => User)
  toUser: User;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  body: string;

  @Column({ update: false })
  createdAt: number = Date.now();
}
