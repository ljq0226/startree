import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { SensitiveWordService } from './sensitive-word.service'
import { Sensi } from './entities/sen.entity'

@Resolver()
export class SensitiveWordResolver {
  constructor(private readonly sensitiveWordService: SensitiveWordService) {}

  @Query(() => [Sensi])
  findAllWords() {
    return this.sensitiveWordService.findAll()
  }

  @Mutation(() => Boolean)
  DeleteWord(@Args('id') id: number) {
    return this.sensitiveWordService.deleteWord(id)
  }

  @Mutation(() => Boolean)
  CreateWord(@Args('word') word: string) {
    return this.sensitiveWordService.createWord(word)
  }
}
