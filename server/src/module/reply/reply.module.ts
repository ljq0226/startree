import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyResolver } from './reply.resolver';

@Module({
  providers: [ReplyResolver, ReplyService]
})
export class ReplyModule {}
