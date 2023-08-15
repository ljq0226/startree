import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { TagService } from './tag.service'
import { Tag } from './entities/tag.entity'

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Query(() => [Tag])
  findByHashTag(@Args('query') query: string) {
    return this.tagService.findByHashTag(query)
  }

  @Mutation(() => Tag)
  createTag(@Args('name') name: string) {
    return this.tagService.create(name)
  }
}
