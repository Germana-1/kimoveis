import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from "typeorm";
import { Properties } from "./properties.entity";

@Entity()
class Categories {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Properties, (properties) => properties.category)
  properties: Properties[];
}

export { Categories };
