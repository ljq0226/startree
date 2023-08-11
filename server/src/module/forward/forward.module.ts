import { Module } from '@nestjs/common'
import { ForwardService } from './forward.service'
import { ForwardResolver } from './forward.resolver'

@Module({
  providers: [ForwardResolver, ForwardService],
})
export class ForwardModule {}
