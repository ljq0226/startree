import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteReplyInput {
  @Field()
  parentId: number

  @Field()
  postId: number
}
