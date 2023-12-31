import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateStarInput {
  @Field()
  postId: number

  @Field()
  userName: string
}
