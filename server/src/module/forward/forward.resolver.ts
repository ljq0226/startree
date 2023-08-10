import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ForwardService } from './forward.service';
import { Forward } from './entities/forward.entity';
import { CreateForwardInput } from './dto/create-forward.input';
import { UpdateForwardInput } from './dto/update-forward.input';

@Resolver(() => Forward)
export class ForwardResolver {
  constructor(private readonly forwardService: ForwardService) {}

  @Mutation(() => Forward)
  createForward(@Args('createForwardInput') createForwardInput: CreateForwardInput) {
    return this.forwardService.create(createForwardInput);
  }

  @Query(() => [Forward])
  findAll() {
    return this.forwardService.findAll();
  }

  @Query(() => Forward)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.forwardService.findOne(id);
  }

  @Mutation(() => Forward)
  updateForward(@Args('updateForwardInput') updateForwardInput: UpdateForwardInput) {
    return this.forwardService.update(updateForwardInput.id, updateForwardInput);
  }

  @Mutation(() => Forward)
  removeForward(@Args('id', { type: () => Int }) id: number) {
    return this.forwardService.remove(id);
  }
}
