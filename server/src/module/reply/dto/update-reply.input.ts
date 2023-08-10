import { CreateReplyInput } from './create-reply.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateReplyInput extends PartialType(CreateReplyInput) {
  @Field(() => Int)
  id: number;
}
