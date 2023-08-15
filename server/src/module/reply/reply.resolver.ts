import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { ReplyService } from './reply.service'
import { Reply } from './entities/reply.entity'
import { DeleteReplyInput } from './dto/delete-reply.input'
import { CreateReplyInput } from './dto/create-reply.input copy'

@Resolver(() => Reply)
export class ReplyResolver {
  constructor(private readonly replyService: ReplyService) {}

  @Mutation(() => Boolean)
  createReply(@Args('createReplyInput') createReplyInput: CreateReplyInput) {
    return this.replyService.create(createReplyInput)
  }

  @Mutation(() => Boolean)
  deleteReply(@Args('deleteReplyInput') deleteReplyInput: DeleteReplyInput) {
    return this.replyService.delete(deleteReplyInput)
  }
}
