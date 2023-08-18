import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
class UserData {
  @Field()
  name: string

  @Field()
  nickName: string

  @Field()
  image: string
}
@ObjectType()
class TagData {
  @Field()
  id: number

  @Field()
  name: string
}

@ObjectType()
export class QueryInput {
  @Field(() => [UserData])
  users: UserData[]

  @Field(() => [TagData])
  tags: TagData[]
}
