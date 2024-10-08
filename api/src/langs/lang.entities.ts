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

@Entity()
export class Lang extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  @IsString()
  label: string;

  @ManyToMany(() => Repo, repo => repo.langs)
  repos?: Repo[];
}
