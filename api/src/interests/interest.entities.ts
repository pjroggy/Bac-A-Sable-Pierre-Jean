import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import { ID, Field, ObjectType } from "type-graphql";
import { IsString, MaxLength } from "class-validator";

@ObjectType()
@Entity("interest")
export class Interest extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn({ type: "int", unique: true })
  id: number;

  @Field()
  @Column({ type: "varchar", unique: true, length: 50 })
  @IsString({ message: "Le nom doit être de type string" })
  @MaxLength(50, { message: "Le nom ne doit pas excéder 50 caractères."})
  name: string;
}
