import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StarService } from './star.service';
import { Star } from './entities/star.entity';
import { CreateStarInput } from './dto/create-star.input';
import { UpdateStarInput } from './dto/update-star.input';

@Resolver(() => Star)
export class StarResolver {
  constructor(private readonly starService: StarService) {}

  @Mutation(() => Star)
  createStar(@Args('createStarInput') createStarInput: CreateStarInput) {
    return this.starService.create(createStarInput);
  }

  @Query(() => [Star])
  findAll() {
    return this.starService.findAll();
  }

  @Query(() => Star)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.starService.findOne(id);
  }

  @Mutation(() => Star)
  updateStar(@Args('updateStarInput') updateStarInput: UpdateStarInput) {
    return this.starService.update(updateStarInput.id, updateStarInput);
  }

  @Mutation(() => Star)
  removeStar(@Args('id', { type: () => Int }) id: number) {
    return this.starService.remove(id);
  }
}
