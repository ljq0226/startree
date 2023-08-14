import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { LikeService } from './like.service'
import { Like } from './entities/like.entity'
import { CreateLikeInput } from './dto/create-like.input'
import { DeleteLikeInput } from './dto/delete-like.input'

@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @Mutation(() => Boolean)
  createLike(@Args('createLikeInput') createLikeInput: CreateLikeInput) {
    return this.likeService.create(createLikeInput)
  }

  @Mutation(() => Boolean)
  deleteLike(@Args('deleteLikeInput') deleteLikeInput: DeleteLikeInput) {
    return this.likeService.delete(deleteLikeInput)
  }
}
