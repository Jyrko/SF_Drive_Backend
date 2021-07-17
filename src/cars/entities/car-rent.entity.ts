import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
export default class CarRent {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  regularPrice: String;

  @Column()
  ThreeDayRentPrice: String;

  @Column()
  FiveDayPlusRentPrice: String;
}
