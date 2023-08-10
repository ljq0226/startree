import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReplyService } from './reply.service';
import { Reply } from './entities/reply.entity';
import { CreateReplyInput } from './dto/create-reply.input';
import { UpdateReplyInput } from './dto/update-reply.input';

@Resolver(() => Reply)
export class ReplyResolver {
  constructor(private readonly replyService: ReplyService) {}

  @Mutation(() => Reply)
  createReply(@Args('createReplyInput') createReplyInput: CreateReplyInput) {
    return this.replyService.create(createReplyInput);
  }

  @Query(() => [Reply])
  findAll() {
    return this.replyService.findAll();
  }

  @Query(() => Reply)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.replyService.findOne(id);
  }

  @Mutation(() => Reply)
  updateReply(@Args('updateReplyInput') updateReplyInput: UpdateReplyInput) {
    return this.replyService.update(updateReplyInput.id, updateReplyInput);
  }

  @Mutation(() => Reply)
  removeReply(@Args('id', { type: () => Int }) id: number) {
    return this.replyService.remove(id);
  }
}
