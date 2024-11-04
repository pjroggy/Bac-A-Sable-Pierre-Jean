import { Repo } from "../repos/repos.entities";
import { IsString } from "class-validator";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import "reflect-metadata"
import { Field, ObjectType } from "type-graphql";
@ObjectType()
@Entity()
export class Lang extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;
 
  @Field()
  @Column({ length: 100 })
  @IsString()
  label: string;
  
  
  @ManyToMany(() => Repo, repo => repo.langs)
  repos?: Repo[];
}
