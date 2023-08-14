import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PostInfo } from '../post/dto/postInfo'
import { StarService } from './star.service'
import { Star } from './entities/star.entity'
import { CreateStarInput } from './dto/create-star.input'
import { DeleteStarInput } from './dto/delete-star.input'

@Resolver(() => Star)
export class StarResolver {
  constructor(private readonly starService: StarService) {}

  @Mutation(() => Boolean)
  createStar(@Args('createStarInput') createStarInput: CreateStarInput) {
    return this.starService.create(createStarInput)
  }

  @Mutation(() => Boolean)
  deleteStar(@Args('deleteStarInput') deleteStarInput: DeleteStarInput) {
    return this.starService.delete(deleteStarInput)
  }

  @Query(() => [PostInfo])
  getStarPost(@Args('userName') userName: string) {
    return this.starService.getStarPost(userName)
  }
}
