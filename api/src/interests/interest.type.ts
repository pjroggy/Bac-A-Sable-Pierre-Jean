@InputType()
export class CreateInterestInput implements Partial<Interest> {
  @Field()
  name: string;
}

@InputType()
export class UpdateInterestInput implements Partial<Interest> {
  @Field()
  id: number;
  
  @Field()
  name: string;
}