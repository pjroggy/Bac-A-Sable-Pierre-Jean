import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Interest } from "./interest.entities";
import { CreateInterestInput, UpdateInterestInput } from "./interest.type";

@Resolver(Interest)
export default class InterestResolver {
  @Query(() => [Interest])
  async getInterests() {
    const interests: Interest[] = await Interest.find();
    return interests;
  }

  @Query(() => Interest)
  async getInterest(@Arg("id", () => Number) id: number) {
    const interest: Interest = await Interest.findOneOrFail({
      where: { id },
    });

    return interest;
  }

  @Mutation(() => Interest)
  async createNewInterest(@Arg("data") newInterest: CreateInterestInput) {
    const { name } = newInterest;
    const existingInterest = await Interest.findOne({
      where: { name },
    });

    if (existingInterest) {
      throw new Error(`L'intérêt "${name}" existe déjà.`);
    }

    const interest = new Interest();
    interest.name = name;
    await interest.save();

    const foundInterest = await Interest.findOneOrFail({
      where: { name },
    });

    return foundInterest;
  }

  @Mutation(() => Interest)
  async updateInterest(@Arg("data") newDataInterest: UpdateInterestInput) {
    const { id, name } = newDataInterest;

    const foundInterest = await Interest.findOne({
      where: { id },
    });

    if (!foundInterest) {
      throw new Error(`L'intérêt avec l'id ${id} n'a pas été trouvé
        dans la base de données.`);
    }

    if (name) {
      foundInterest.name = name;
    }

    await foundInterest.save();

    const interest = await Interest.findOneOrFail({
      where: { id },
    });

    return interest;
  }

  @Mutation(() => Interest)
  async deleteInterest(@Arg("id", () => Number) id: number) {
    const foundInterest = await Interest.findOne({
      where: { id },
    });

    if (!foundInterest) {
      throw new Error(`L'intérêt avec l'id ${id} n'a pas été trouvé
        dans la base de données.`);
    }

    await foundInterest.remove();

    return { id };
  }
}
