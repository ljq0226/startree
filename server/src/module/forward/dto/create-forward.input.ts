import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateForwardInput {
  @Field()
  postId: number

  @Field()
  userName: string
}
