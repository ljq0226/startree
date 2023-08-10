import { CreateStarInput } from './create-star.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStarInput extends PartialType(CreateStarInput) {
  @Field(() => Int)
  id: number;
}
