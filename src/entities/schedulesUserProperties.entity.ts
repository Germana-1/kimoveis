import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Properties } from "./properties.entity";
import { User } from "./user.entity";

@Entity("schedules_user_properties")
class SchedulesUserProperties {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => Properties, (properties) => properties.schedules)
  property: Properties;

  @ManyToOne(() => User, (user) => user.schedulesUserProperties)
  user: User;
}

export { SchedulesUserProperties };
