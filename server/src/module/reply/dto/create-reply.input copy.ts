import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateReplyInput {
  @Field()
  parentId: number

  @Field()
  userName: string

  @Field()
  content: string
}
