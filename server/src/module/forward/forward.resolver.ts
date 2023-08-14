import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { ForwardService } from './forward.service'
import { Forward } from './entities/forward.entity'
import { CreateForwardInput } from './dto/create-forward.input'
import { DeleteForwardInput } from './dto/Delete-forward.input'

@Resolver(() => Forward)
export class ForwardResolver {
  constructor(private readonly forwardService: ForwardService) {}

  @Mutation(() => Boolean)
  createForward(@Args('createForwardInput') createForwardInput: CreateForwardInput) {
    return this.forwardService.create(createForwardInput)
  }

  @Mutation(() => Boolean)
  deleteForward(@Args('deleteForwardInput') deleteForwardInput: DeleteForwardInput) {
    return this.forwardService.delete(deleteForwardInput)
  }
}
