import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserService } from './user.service'
import { User } from './entities/user.entity'
import { CreateUserInput } from './dto/create-user.input'
import { Count } from './dto/count'
import { ProfileData } from './dto/profileData'

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

  @Query(() => Count)
  profileCount(@Args('name') name: string) {
    return this.userService.profileCount(name)
  }

  @Query(() => ProfileData)
  async profileData(@Args('name') name: string) {
    return await this.userService.profileData(name)
  }
}
