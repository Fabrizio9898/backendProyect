import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Orders } from './orders.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column({ length: 50 ,nullable:false}) 
  name: string;

  @Column({ unique: true, length: 50 ,nullable:false})
  email: string;

  @Column({ length: 20,nullable:false })
  password!: string;

  @Column('int')
  phone: number;

  @Column({ length: 50, nullable: true })
  country: string;

  @Column('text', { nullable: true })
  address: string;

  @Column({ length: 50, nullable: true })
  city: string;

  @OneToMany(() => Orders, (order) => order.user)
  orders: Orders[];
}


/**Users

    id: debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.

    name: debe ser una cadena de texto de máximo 50 caracteres y no puede ser nulo.

    email: debe ser una cadena de texto de máximo 50 caracteres, único y no puede ser nulo.

    password: debe ser una cadena de texto de máximo 20 caracteres y no puede ser nulo.

    phone: debe ser un número entero.

    country: debe ser una cadena de texto de máximo 50 caracteres.

    address: debe ser un texto.

    city: debe ser una cadena de texto de máximo 50 caracteres.

    orders_id: Relación 1:N con orders.*/


/*
Categories

    id: debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.

    name: debe ser una cadena de texto de máximo 50 caracteres y no puede ser nulo.

    Relación: N:1 con products.*/
    
    /*

Orders

    id: debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.

    user_id:  (Relación 1:N) con users.

    date.

    Relación 1:1 con orderDetails.*/

/*
OrderDetails

    id: debe ser un valor único generado automáticamente en formato UUID. No puede ser nulo y actúa como la clave primaria de la entidad.

    price: debe ser un número decimal con una precisión de 10 dígitos y una escala de 2 dígitos. No puede ser nulo. 

    order_id: Relación 1:1 con orders.

    Relación N:N con products. */
