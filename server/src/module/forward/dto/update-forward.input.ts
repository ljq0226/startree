import { CreateForwardInput } from './create-forward.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateForwardInput extends PartialType(CreateForwardInput) {
  @Field(() => Int)
  id: number;
}
