import { Field, ObjectType } from '@nestjs/graphql'
import { ProfileCount } from 'src/module/user/dto/profileCount'
import { PostCount } from './count'

@ObjectType()
class UserInfo {
  @Field(() => String)
  name: string

  @Field(() => String)
  nickName: string

  @Field(() => String)
  image: string
}

@ObjectType()
export class PostInfo {
  @Field(() => Number)
  id: number

  @Field(() => String)
  content: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => UserInfo)
  user: UserInfo

  @Field(() => PostCount)
  postCount: PostCount

  @Field(() => ProfileCount)
  profileCount: ProfileCount
}
