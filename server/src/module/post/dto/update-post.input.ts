import { Field, InputType, Int, PartialType } from '@nestjs/graphql'
import { CreatePostInput } from './create-post.input'

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
  @Field(() => Int)
  id: number
}
