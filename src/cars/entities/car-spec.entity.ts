import { Entity, ObjectID, Column, ObjectIdColumn } from 'typeorm';


@Entity()
export default class CarSpec {

  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  manufacture: String;

  @Column()
  model: String;

  @Column()
  vehicleType: String;

  @Column()
  vehicleRegistrationPlate: String;

  @Column()
  vinNumber: String;

  @Column()
  color: String;

  @Column()
  engineType: String;

  @Column()
  engineDisplacement: String;

  @Column()
  engineHp: String;

  @Column()
  transmissionType: String;

  @Column()
  wheelDrive: String;

  @Column()
  mileage: String;

  @Column()
  vehiclePassportSerial: String;

  @Column()
  stsSerial: String;
}
