import { Entity, Column, ObjectIdColumn, ObjectID } from "typeorm";

@Entity()
export default class CarInsurance {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  osagoSerial: string;

  @Column()
  kaskoSerial: string;
}
