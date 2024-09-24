import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column({
    length: 100,
  })
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  address!: string;

  @Column()
  phone!: string;

  @Column()
  country?: string;

  @Column()
  city?: string;
}
