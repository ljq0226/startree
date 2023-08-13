import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteLikeInput {
  @Field()
  postId: number

  @Field()
  userName: string
}
