import { Field, InputType, Int, PartialType } from '@nestjs/graphql'
import { CreateReplyInput } from './create-reply.input'

@InputType()
export class UpdateReplyInput extends PartialType(CreateReplyInput) {
  @Field(() => Int)
  id: number
}
