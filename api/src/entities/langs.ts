import {
    BaseEntity,
    Column, Entity,
    PrimaryGeneratedColumn
   } from "typeorm";
   
   @Entity()
   export class Lang extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    label: string;
   }