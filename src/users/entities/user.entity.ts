import { Entity, ObjectIdColumn, Column, ObjectId } from 'typeorm';
// import { ObjectId } from 'mongodb';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  age: number;
}
