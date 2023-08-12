import { Field, Int, ObjectType } from '@nestjs/graphql'
import { User } from 'src/module/user/entities/user.entity'

@ObjectType()
export class Profile {
  @Field(() => Int)
  id: number

  @Field(() => User)
  user: User

  @Field()
  bio: string

  @Field()
  github: string

  @Field()
  website: string
}
