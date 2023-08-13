import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteStarInput {
  @Field()
  postId: number

  @Field()
  userName: string
}
