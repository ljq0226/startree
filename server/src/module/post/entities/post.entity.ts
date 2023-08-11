import { Field, ObjectType } from '@nestjs/graphql'
import { Reply } from 'src/module/reply/entities/reply.entity'
import { Tag } from 'src/module/tag/entities/tag.entity'
import { User } from 'src/module/user/entities/user.entity'

@ObjectType()
export class Post {
  @Field()
  id: number

  @Field()
  content: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field(() => User, { nullable: true })
  user: User

  @Field({ nullable: true })
  userName: string

  @Field(() => [Reply], { nullable: true })
  replys: Reply[]

  @Field(() => [Tag], { nullable: true })
  tags: Tag[]
}
