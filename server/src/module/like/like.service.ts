import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { PostService } from '../post/post.service'
import { CreateLikeInput } from './dto/create-like.input'
import { DeleteLikeInput } from './dto/delete-like.input'

@Injectable()
export class LikeService {
  constructor(
    private prisma: PrismaService,
    private readonly postService: PostService,
  ) {}

  async findFirst(postId: number, userName: string) {
    return await this.prisma.like.findFirst({
      where: {
        AND: [
          {
            userName,
          },
          {
            postId,
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  async create({ postId, userName }: CreateLikeInput) {
    const like = await this.findFirst(postId, userName)
    if (!like) {
      await this.prisma.like.create({
        data: {
          userName,
          postId,
        },
      })
      return true
    }
    return false
  }

  async delete({ postId, userName }: DeleteLikeInput) {
    const like = await this.findFirst(postId, userName)
    if (like) {
      await this.prisma.like.delete({
        where: { id: like.id },
      })
      return true
    }
    return false
  }

  async getLikePost(userName: string) {
    const likes = await this.prisma.like.findMany({
      where: {
        userName,
      },
      select: {
        postId: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    const postIds = likes.map(item => item.postId)
    return this.postService.getPostInfoByIds(postIds, userName)
  }
}
