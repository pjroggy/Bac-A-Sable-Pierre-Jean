import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Cat } from "./cat.entities";

@InputType()
export class CatInput implements Partial<Cat> {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  profile_picture?: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  birthday: Date;

  @Field()
  sexe: string;

  @Field()
  hair_color: string;

  @Field({ nullable: true })
  available?: Date;

  @Field()
  city: string;

  @Field()
  breed: string;

  @Field()
  role: string;

  @Field()
  CGU_accepted: boolean;
}
@Resolver(Cat)
export class CatResolver {
  // Get all cats
  @Query(() => [Cat])
  async allCats() {
    return await Cat.find();
  }

  // Get one cat by ID
  @Query(() => Cat, { nullable: true })
  async getCatById(@Arg("id") id: number) {
    return await Cat.findOneBy({ id });
  }

  // Create a new cat
  @Mutation(() => Cat)
  async createNewCat(@Arg("data") newCat: CatInput) {
    const cat = new Cat();
    if (!newCat.CGU_accepted) {
      return cat;
    }
    cat.name = newCat.name;
    cat.email = newCat.email;
    cat.password = newCat.password;
    cat.profile_picture = newCat.profile_picture;
    cat.description = newCat.description;
    cat.birthday = newCat.birthday;
    cat.sexe = newCat.sexe;
    cat.hair_color = newCat.hair_color;
    cat.available = newCat.available;
    cat.city = newCat.city;
    cat.breed = newCat.breed;
    cat.role = newCat.role;

    await cat.save();
    return cat;
  }

  // Update an existing cat
  @Mutation(() => Cat, { nullable: true })
  async updateCat(
    @Arg("id") id: number,
    @Arg("name", { nullable: true }) name: string,
    @Arg("email", { nullable: true }) email: string,
    @Arg("password", { nullable: true }) password: string,
    @Arg("profile_picture", { nullable: true }) profilePicture: string,
    @Arg("description", { nullable: true }) description: string,
    @Arg("birthday", { nullable: true }) birthday: Date,
    @Arg("sexe", { nullable: true }) sexe: string,
    @Arg("hair_color", { nullable: true }) hairColor: string,
    @Arg("available", { nullable: true }) available: Date,
    @Arg("city", { nullable: true }) city: string,
    @Arg("breed", { nullable: true }) breed: string,
    @Arg("role", { nullable: true }) role: string
  ) {
    const cat = await Cat.findOneBy({ id });
    if (!cat) return null;

    if (email) cat.email = email;
    if (password) cat.password = password;
    if (name) cat.name = name;
    if (description) cat.description = description;
    if (birthday) cat.birthday = birthday;
    if (sexe) cat.sexe = sexe;
    if (hairColor) cat.hair_color = hairColor;
    if (profilePicture) cat.profile_picture = profilePicture;
    if (available) cat.available = available;
    if (city) cat.city = city;
    if (breed) cat.breed = breed;
    if (role) cat.role = role;

    await cat.save();
    return cat;
  }

  // Delete a cat
  @Mutation(() => Boolean)
  async deleteCat(@Arg("id") id: number) {
    const result = await Cat.delete({ id });
    return result.affected === 1;
  }
}
