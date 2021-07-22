import { Entity, ObjectID, Column, ObjectIdColumn } from 'typeorm';
import CarAdditionalServices from './car-additional-services.entity';
import CarInsurance from './car-insurance.entity';
import CarOptions from './car-options.entity';
import CarRent from './car-rent.entity';
import CarSpec from './car-spec.entity';

@Entity("cars")
export class Car {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  ownerId: string;

  @Column(() => CarSpec)
  specs: CarSpec;

  @Column(() => CarRent)
  rentInfo: CarRent;

  @Column(() => CarInsurance)
  insurance: CarInsurance;

  @Column(() => CarOptions)
  options: CarOptions;

  @Column(() => CarAdditionalServices)
  services: CarAdditionalServices;
}
