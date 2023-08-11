import { Module } from '@nestjs/common'
import { FollowService } from '../follow/follow.service'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'

@Module({
  providers: [UserResolver, UserService, FollowService],
})
export class UserModule {}
