import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
export default class CarOptions {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  airConditioner: boolean;

  @Column()
  airBags: boolean;

  @Column()
  airConditioner: boolean;

  @Column()
  bluetooth: boolean;

  @Column()
  cruiseControl: boolean;

  @Column()
  multimedia: boolean;

  @Column()
  navigationSys: boolean;

  @Column()
  IsofixFastening: boolean;

  @Column()
  heater: boolean;

  @Column()
  seatHeater: boolean;

  @Column()
  seatVent: boolean;

  @Column()
  rearCam: boolean;

  @Column()
  roofRack: boolean;
  
  @Column()
  parktronic: boolean;
}
