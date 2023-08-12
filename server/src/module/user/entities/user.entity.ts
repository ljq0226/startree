import { Field, ObjectType } from '@nestjs/graphql'
import { Like } from 'src/module/like/entities/like.entity'
import { Post } from 'src/module/post/entities/post.entity'
import { Profile } from 'src/module/profile/entities/profile.entity'
import { Reply } from 'src/module/reply/entities/reply.entity'
import { Star } from 'src/module/star/entities/star.entity'

@ObjectType()
export class User {
  @Field(() => String, { description: 'user name' })
  name: string

  @Field(() => String, { description: 'user email' })
  email: string

  @Field(() => String, { description: 'user image' })
  image: string

  @Field(() => String, { description: 'user nickname' })
  nickName: string

  @Field(() => Profile)
  profile: Profile

  @Field(() => [Post])
  posts: Post[]

  @Field(() => [Reply])
  replys: Reply[]

  @Field(() => [Like])
  likes: Like[]

  @Field(() => [Star])
  stars: Star[]

  @Field(() => Date, { description: 'createdTime' })
  createdAt: Date

  @Field(() => Date, { description: 'updatedTime' })
  updatedAt: Date
}
