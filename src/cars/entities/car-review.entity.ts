import { Entity, Column, ObjectIdColumn, ObjectID } from "typeorm";

@Entity()
export default class CarReview {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  authorId: string;

  @Column()
  date: string;

  @Column()
  content: string;
}
