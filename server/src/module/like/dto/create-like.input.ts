import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateLikeInput {
  @Field()
  postId: number

  @Field()
  userName: string
}
