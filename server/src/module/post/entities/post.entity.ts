import { Field, Int, ObjectType } from '@nestjs/graphql'
import { User } from 'src/module/user/entities/user.entity'

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number

  @Field()
  content: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  @Field()
  linkUsers: string

  @Field(() => User, { nullable: true })
  User: User

  @Field({ nullable: true })
  userName: string
}
