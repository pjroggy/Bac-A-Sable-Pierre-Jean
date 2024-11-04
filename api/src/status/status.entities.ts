import { Repo } from "../repos/repos.entities";
import { IsString } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Status extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  @IsString()
  label: string;

  @OneToMany(() => Repo, (repo) => repo.status)
  repos?: Repo[];
}
