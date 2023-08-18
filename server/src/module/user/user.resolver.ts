import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserService } from './user.service'
import { User } from './entities/user.entity'
import { CreateUserInput } from './dto/create-user.input'
import { ProfileCount } from './dto/profileCount'
import { UpdateUserInput } from './dto/update-user.input'
import { QueryInput } from './dto/queryInput'

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput)
  }

  @Query(() => [User], { name: 'findAll' })
  findAll() {
    return this.userService.findAll()
  }

  @Query(() => [User])
  findByAt(@Args('query') query: string) {
    return this.userService.findByAt(query)
  }

  @Query(() => User)
  userData(@Args('name') name: string) {
    return this.userService.findOne(name)
  }

  @Query(() => QueryInput)
  queryInput(@Args('query') query: string) {
    return this.userService.queryInput(query)
  }

  @Query(() => ProfileCount)
  profileCount(@Args('name') name: string) {
    return this.userService.profileCount(name)
  }

  @Mutation(() => User)
  updateUserProfile(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.updateUserProfile(updateUserInput)
  }
}
