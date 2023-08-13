import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PostCount {
  @Field(() => Number)
  reply: number

  @Field(() => Number)
  like: number

  @Field(() => Number)
  forward: number

  @Field(() => Boolean)
  isStar: boolean

  @Field(() => Boolean)
  isReply: boolean

  @Field(() => Boolean)
  isLike: boolean

  @Field(() => Boolean)
  isForward: boolean
}
