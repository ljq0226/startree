import { Field, ObjectType } from '@nestjs/graphql'
import { Post } from 'src/module/post/entities/post.entity'

@ObjectType()
export class Tag {
  @Field()
  id: number

  @Field()
  name: string

  @Field(() => [Post])
  posts: Post[]

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
