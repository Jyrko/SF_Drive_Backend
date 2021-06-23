import { Entity, ObjectID, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Passport {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  serial: string;

  @Column()
  dateOfIssue: Date;

  @Column()
  issueAuthority: string;

}
