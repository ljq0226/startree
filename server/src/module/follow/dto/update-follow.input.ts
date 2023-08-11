import { Field, InputType, Int, PartialType } from '@nestjs/graphql'
import { CreateFollowInput } from './create-follow.input'

@InputType()
export class UpdateFollowInput extends PartialType(CreateFollowInput) {
  @Field(() => Int)
  id: number
}
