import { Field, ObjectType } from '@nestjs/graphql'
import { Post } from 'src/module/post/entities/post.entity'
import { User } from 'src/module/user/entities/user.entity'

@ObjectType()
export class Forward {
  @Field()
  id: number

  @Field(() => User)
  user: User

  @Field()
  userName: string

  @Field(() => Post)
  post: Post

  @Field()
  postId: number

  @Field()
  forwardPostId: number

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
