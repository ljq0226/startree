import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PostService } from './post.service'
import { Post } from './entities/post.entity'
import { CreatePostInput } from './dto/create-post.input'
import { UpdatePostInput } from './dto/update-post.input'

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postService.create(createPostInput)
  }

  @Query(() => [Post])
  findAllPost() {
    return this.postService.findAllPost()
  }

  @Query(() => Post)
  findPostByTag(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findPostByTag(id)
  }

  @Query(() => [Post])
  findPostByUser(@Args('name') name: string) {
    return this.postService.findPostByUser(name)
  }

  @Mutation(() => Post)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postService.update(updatePostInput.id, updatePostInput)
  }

  @Mutation(() => Post)
  removePost(@Args('id', { type: () => Int }) id: number) {
    return this.postService.remove(id)
  }
}
