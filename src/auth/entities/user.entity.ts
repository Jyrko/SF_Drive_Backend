import { Entity, ObjectID, Column, ObjectIdColumn } from 'typeorm';
import { Passport } from './passport.entity';
import { DrivingLicense } from './driving-license.entity';

@Entity("users")
export class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  birthdate: Date;

  @Column()
  storagePath: string;

  @Column(() => Passport)
  passport: Passport;

  @Column(() => DrivingLicense)
  license: DrivingLicense;
}
