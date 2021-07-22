import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
export default class CarAdditionalServices {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  babySeat: boolean;

  @Column()
  carDelivery: boolean;

  @Column()
  endInAnyPlace: boolean;

  @Column()
  fullTank: boolean;

}
