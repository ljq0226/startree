import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PostInfo } from '../post/dto/postInfo'
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

  @Query(() => [PostInfo])
  getLikePost(@Args('userName') userName: string) {
    return this.likeService.getLikePost(userName)
  }
}
