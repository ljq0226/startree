import { Field, ObjectType } from '@nestjs/graphql'
import { Post } from 'src/module/post/entities/post.entity'
import { User } from 'src/module/user/entities/user.entity'

@ObjectType()
export class Like {
  @Field()
  id: number

  @Field()
  userName: string

  @Field()
  postId: number

  @Field(() => Post)
  post: Post

  @Field(() => User)
  user: User

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
