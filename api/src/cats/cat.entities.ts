import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import {
  IsEmail,
  IsString,
  Length,
  IsDate,
  IsOptional,
  IsIn,
  IsUrl,
} from "class-validator";

@ObjectType()
@Entity()
export class Cat extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  @IsEmail({}, { message: "Format d'email invalide" })
  email: string;

  @Field()
  @Column()
  @IsString()
  @Length(6, 100, {
    message: "Le mot de passe doit être compris entre 6 et 100 caractères",
  })
  password: string;

  @Field()
  @Column()
  @IsString()
  @Length(2, 50, {
    message: "Le nom doit être compris entre 2 et 50 caractères",
  })
  name: string;

  @Field()
  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(0, 255, { message: "La description ne peut dépasser 255 caratères" })
  description: string;

  @Field()
  @Column({ nullable: true })
  @IsDate()
  birthday: Date;

  @Field()
  @Column({ nullable: true })
  @IsString()
  @IsIn(["mâle", "femelle", "autre"], {
    message: "Le sexe doit être 'mâle', 'femelle', or 'autre'",
  })
  sexe: string;

  @Field()
  @Column({ nullable: true })
  @IsString()
  hair_color: string;

  @Field()
  @Column({ nullable: true })
  @IsOptional()
  @IsUrl({}, { message: "L'image doit avoir une URL valide" })
  profile_picture: string;

  @Field()
  @Column({ type: "datetime", nullable: true })
  @IsOptional()
  @IsDate()
  available: Date;

  @Field()
  @Column({ nullable: true })
  @IsString()
  city: string;

  @Field()
  @Column({ nullable: true })
  @IsString()
  breed: string;

  @Field()
  @Column({ default: "user" })
  @IsString()
  role: string;
}
