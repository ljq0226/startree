import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CreateForwardInput } from './dto/create-forward.input'
import { DeleteForwardInput } from './dto/delete-forward.input'

@Injectable()
export class ForwardService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async findFirst(postId: number, userName: string) {
    return await this.prisma.forward.findFirst({
      where: {
        AND: [
          { forwardPostId: postId },
          { userName },
        ],
      },
    })
  }

  async create({ postId, userName }: CreateForwardInput) {
    const forward = await this.findFirst(postId, userName)
    if (!forward) {
      const forwardPost = await this.prisma.post.findUnique({
        where: { id: postId },
      })
      const newPost = await this.prisma.post.create({
        data: {
          content: forwardPost.content,
          userName,
        },
      })
      await this.prisma.forward.create({
        data: {
          postId: newPost.id,
          forwardPostId: postId,
          userName,
        },
      })
      return true
    }
    return false
  }

  async delete({ postId, userName }: DeleteForwardInput) {
    const forward = await this.findFirst(postId, userName)
    if (forward) {
      const id = forward.id
      const postId = forward.postId
      await this.prisma.forward.delete({
        where: {
          id,
        },
      })
      await this.prisma.post.delete({
        where: {
          id: postId,
        },
      })
      return true
    }
    return false
  }
}
