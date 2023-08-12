import { Field, InputType, Int, PartialType } from '@nestjs/graphql'
import { CreateUserInput } from './create-user.input'

@InputType()
class ProfileInput {
  @Field(() => Int)
  id: number

  @Field(() => String)
  bio?: string

  @Field(() => String)
  website?: string

  @Field(() => String)
  github?: string
}
@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  name: string

  @Field(() => String)
  image?: string

  @Field(() => String)
  email?: string

  @Field(() => String)
  nickName?: string

  @Field(() => ProfileInput)
  profile: ProfileInput
}
