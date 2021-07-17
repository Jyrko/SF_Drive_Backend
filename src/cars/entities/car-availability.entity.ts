import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export default class CarAvailability {
  @ObjectIdColumn()
  _id: ObjectID;
}
