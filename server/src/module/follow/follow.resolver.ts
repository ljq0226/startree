import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from '../user/entities/user.entity'
import { FollowService } from './follow.service'
import { Follow } from './entities/follow.entity'
import { CreateFollowInput } from './dto/create-follow.input'

@Resolver(() => Follow)
export class FollowResolver {
  constructor(private readonly followService: FollowService) {}

  @Mutation(() => Boolean)
  createFollow(@Args('createFollowInput') createFollowInput: CreateFollowInput) {
    return this.followService.create(createFollowInput)
  }

  @Query(() => [User])
  findFollowings(@Args('name') name: string) {
    return this.followService.findFollowings(name)
  }

  @Query(() => [User])
  findFollowers(@Args('followedName') followedName: string) {
    return this.followService.findFollowed(followedName)
  }

  @Query(() => Number)
  followedCount(@Args('name') name: string) {
    return this.followService.followedCount(name)
  }

  @Mutation(() => Boolean)
  removeFollow(@Args('removeFollowInput') removeFollowInput: CreateFollowInput) {
    return this.followService.remove(removeFollowInput)
  }
}
