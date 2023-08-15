import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ProfileData } from './dto/profileData'
import { PostService } from './post.service'
import { Post } from './entities/post.entity'
import { CreatePostInput } from './dto/create-post.input'
import { UpdatePostInput } from './dto/update-post.input'
import { PostCount } from './dto/count'
import { PostInfo, PostReplyInfo } from './dto/postInfo'

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postService.create(createPostInput)
  }

  @Query(() => [PostInfo])
  findAllPost(@Args('name') name: string) {
    return this.postService.findAllPost(name)
  }

  @Query(() => PostCount)
  getPostCount(@Args('id') id: number, @Args('name') name: string) {
    return this.postService.postCount(id, name)
  }

  @Query(() => [Post])
  findHomePost(@Args('name') name: string) {
    return this.postService.findHomePost(name)
  }

  @Query(() => [PostInfo])
  getPostById(@Args('id')id: number, @Args('name') name: string) {
    return this.postService.getParentPostReply(id, name)
  }

  @Query(() => Post)
  findPostByTag(@Args('id')id: number) {
    return this.postService.findPostByTag(id)
  }

  @Query(() => [Post])
  findPostByUser(@Args('name') name: string) {
    return this.postService.findPostByUser(name)
  }

  @Query(() => ProfileData)
  async getProfileData(@Args('name') name: string) {
    return await this.postService.profileData(name)
  }

  @Query(() => [PostReplyInfo])
  getPostReply(@Args('postId') postId: number, @Args('name') name: string) {
    return this.postService.getPostReply(postId, name)
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
