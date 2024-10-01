import {
    BaseEntity,
    Column, Entity,
    PrimaryColumn
   } from "typeorm";
   
   @Entity()
   export class Repo extends BaseEntity {
    @PrimaryColumn()
    id: string;
   
    @Column()
    isPrivate: number;
   
    @Column({ length: 100 })
    name: string;
   
    @Column({ length: 100 })
    url: string;
   }