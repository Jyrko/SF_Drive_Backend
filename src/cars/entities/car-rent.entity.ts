import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
export default class CarRent {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  regularPrice: String;

  @Column()
  threeDayRentPrice: String;

  @Column()
  fiveDayPlusRentPrice: String;
}
