import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ProfileCount {
  @Field(() => Number)
  posts: number

  @Field(() => Number)
  followings: number

  @Field(() => Number)
  followed: number
}
