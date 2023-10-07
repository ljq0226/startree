import { Field, ObjectType } from '@nestjs/graphql'
import { Post } from 'src/module/post/entities/post.entity'

@ObjectType()
export class Report {
  @Field()
  id: number

  @Field()
  reporter: string

  @Field()
  reported: string

  @Field()
  content: string

  @Field()
  reason: string

  @Field()
  postId: number

  @Field(() => Post)
  post: Post

  @Field()
  status: string

  @Field()
  createdAt: Date
}
