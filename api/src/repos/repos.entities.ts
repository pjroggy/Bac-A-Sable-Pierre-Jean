import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Min, Max, IsString } from "class-validator";
import { Status } from "../status/status.entities";
import { Lang } from "../langs/lang.entities";

@Entity()
export class Repo extends BaseEntity {
  @PrimaryColumn()
  @IsString()
  id: string;

  @ManyToOne(() => Status, (status) => status.id)
  @Min(1)
  @Max(2)
  status: Status;

  @Column({ length: 100 })
  @IsString()
  name: string;

  @Column({ length: 100 })
  @IsString()
  url: string;

  @ManyToMany(() => Lang)
  @JoinTable()
  langs: Lang[];
}
