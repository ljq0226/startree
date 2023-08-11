import { Field, ObjectType } from '@nestjs/graphql'
import { Post } from 'src/module/post/entities/post.entity'
import { User } from '../entities/user.entity'

@ObjectType()
export class ProfileData {
  @Field(() => [Post])
  posts: Post[]

  @Field(() => [User])
  followings: User[]

  @Field(() => [User])
  followed: User[]
}
