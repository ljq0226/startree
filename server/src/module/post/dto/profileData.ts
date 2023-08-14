import { Field, ObjectType } from '@nestjs/graphql'
import { PostInfo } from 'src/module/post/dto/postInfo'
import { User } from '../../user/entities/user.entity'

@ObjectType()
export class ProfileData {
  @Field(() => [PostInfo])
  posts: PostInfo[]

  @Field(() => [User])
  followings: User[]

  @Field(() => [User])
  followed: User[]
}
