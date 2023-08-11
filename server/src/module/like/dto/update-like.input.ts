import { Field, InputType, Int, PartialType } from '@nestjs/graphql'
import { CreateLikeInput } from './create-like.input'

@InputType()
export class UpdateLikeInput extends PartialType(CreateLikeInput) {
  @Field(() => Int)
  id: number
}
