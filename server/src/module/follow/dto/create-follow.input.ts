import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateFollowInput {
  @Field(() => String)
   name: string

  @Field(() => String)
   followedName: string
}
