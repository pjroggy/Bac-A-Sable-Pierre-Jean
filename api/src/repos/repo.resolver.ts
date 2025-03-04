import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Repo } from "./repos.entities";
import { Status } from "../status/status.entities";
// import { Lang } from "../langs/lang.entities";

@InputType()
class RepoInput implements Partial<Repo> {
  @Field()
  id: string;

  @Field()
  url: string;

  @Field()
  name: string;

  @Field()
  isPrivate: number;
}

@Resolver(Repo)
export default class RepoResolver {
  // Methode Get pour tout les repos
  @Query(() => [Repo])
  async allRepos(@Arg("filter", { nullable: true }) filter: number) {
    if (filter) {
      const repoFilteredByLang = await Repo.find({
        where: { langs: { id: filter } },
        relations: {
          status: true,
          langs: true,
        },
      });
      return repoFilteredByLang;
    }
    const repos = await Repo.find({
      relations: {
        status: true,
        langs: true,
      },
    });
    // console.log(repos);
    return repos;
  }

  @Mutation(() => Repo) //ici typage de la donnée entrante
  // @Arg : typage de la donnée sortante
  async createNewRepo(@Arg("data") newRepo: RepoInput) {
    // const newRepo: RepoInput = req.body.data
    // fonction de validation
    console.log(newRepo);
    const repo = new Repo();
    repo.id = newRepo.id;
    repo.name = newRepo.name;
    repo.url = newRepo.url;

    const status = await Status.findOneOrFail({
      where: { id: +newRepo.isPrivate },
    });
    repo.status = status;

    // const langs = await Lang.findOneOrFail({
    //   where: { id: In(langsIds) },
    // });
    // repo.langs = langs;

    await repo.save();
    console.log("repo", repo);
    const myRepo = await Repo.findOneOrFail({
      where: { id: newRepo.id },
      relations: {
        langs: true,
        status: true,
      },
    });
    console.log("myRepo", myRepo);
    return myRepo;
  }
}
