import { Module } from '@nestjs/common'
import { PostService } from '../post/post.service'
import { FollowService } from '../follow/follow.service'
import { UserService } from '../user/user.service'
import { LikeService } from './like.service'
import { LikeResolver } from './like.resolver'

@Module({

  providers: [LikeResolver, LikeService, PostService, FollowService, UserService],
})
export class LikeModule {}
