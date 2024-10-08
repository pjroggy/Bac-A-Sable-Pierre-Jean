import { Repo } from "../repos/repos.entities";
import { IsString } from "class-validator";
import {
    BaseEntity,
    Column, Entity,
    OneToMany,
    PrimaryGeneratedColumn
   } from "typeorm";
   
   @Entity()
   export class Status extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    @IsString()
    label: string;

    @OneToMany(()=> Repo, repo => repo.status)
    repos?: Repo[];
   }