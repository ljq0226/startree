import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { FollowService } from './follow.service'
import { Follow } from './entities/follow.entity'
import { CreateFollowInput } from './dto/create-follow.input'
import { UpdateFollowInput } from './dto/update-follow.input'

@Resolver(() => Follow)
export class FollowResolver {
  constructor(private readonly followService: FollowService) {}

  @Mutation(() => Follow)
  createFollow(@Args('createFollowInput') createFollowInput: CreateFollowInput) {
    return this.followService.create(createFollowInput)
  }

  @Query(() => [Follow])
  findAll() {
    return this.followService.findAll()
  }

  @Query(() => Follow)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.followService.findOne(id)
  }

  @Mutation(() => Follow)
  updateFollow(@Args('updateFollowInput') updateFollowInput: UpdateFollowInput) {
    return this.followService.update(updateFollowInput.id, updateFollowInput)
  }

  @Mutation(() => Follow)
  removeFollow(@Args('id', { type: () => Int }) id: number) {
    return this.followService.remove(id)
  }
}
