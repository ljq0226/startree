import { Module } from '@nestjs/common'
import { PostService } from '../post/post.service'
import { FollowService } from '../follow/follow.service'
import { UserService } from '../user/user.service'
import { StarResolver } from './star.resolver'
import { StarService } from './star.service'

@Module({
  providers: [StarResolver, StarService, PostService, FollowService, UserService],
})
export class StarModule {}
