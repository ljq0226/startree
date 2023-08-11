import { Field, InputType, Int, PartialType } from '@nestjs/graphql'
import { CreateForwardInput } from './create-forward.input'

@InputType()
export class UpdateForwardInput extends PartialType(CreateForwardInput) {
  @Field(() => Int)
  id: number
}
