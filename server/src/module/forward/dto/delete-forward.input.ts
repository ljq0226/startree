import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteForwardInput {
  @Field()
  postId: number

  @Field()
  userName: string
}
