import { Module } from '@nestjs/common'
import { FollowService } from '../follow/follow.service'
import { UserService } from '../user/user.service'
import { PostService } from './post.service'
import { PostResolver } from './post.resolver'

@Module({
  providers: [PostResolver, PostService, FollowService, UserService],
})
export class PostModule {}
