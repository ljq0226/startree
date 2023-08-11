import { Field, InputType, Int, PartialType } from '@nestjs/graphql'
import { CreateStarInput } from './create-star.input'

@InputType()
export class UpdateStarInput extends PartialType(CreateStarInput) {
  @Field(() => Int)
  id: number
}
