import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class Addresses {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  district: string;

  @Column()
  zipCode: string;

  @Column({ nullable: true })
  number?: string;

  @Column()
  city: string;

  @Column()
  state: string;
}

export { Addresses };
