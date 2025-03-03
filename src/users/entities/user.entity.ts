import { Entity, ObjectIdColumn, Column, ObjectId, Index } from 'typeorm';
import { IsEmail, IsNotEmpty, Max, Min } from 'class-validator';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  @Index()
  email: string;

  @Column({ default: 18 })
  @Min(1)
  @Max(120)
  age: number;
}
