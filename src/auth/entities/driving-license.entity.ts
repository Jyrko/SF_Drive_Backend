import { Entity, ObjectID, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class DrivingLicense {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  serial: string;

  @Column()
  dateOfIssue: Date;

}
