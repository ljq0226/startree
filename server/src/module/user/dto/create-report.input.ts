import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateReportInput {
  @Field()
  reporter: string

  @Field()
  content: string

  @Field()
  reason: string

  @Field()
  postId: number
}
