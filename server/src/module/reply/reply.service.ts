import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { DeleteReplyInput } from './dto/delete-reply.input'
import { CreateReplyInput } from './dto/create-reply.input copy'

@Injectable()
export class ReplyService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async isExceedLevelTwo(parentId: number) {
    const p1 = await this.prisma.reply.findFirst({
      where: { postId: parentId },
    })
    if (!p1) {
      return false
    }
    else {
      const p2 = await this.prisma.reply.findFirst({
        where: { postId: p1.parentId },
      })
      if (!p2)
        return false
    }
    return true
  }

  async create({ parentId, userName, content }: CreateReplyInput) {
    // 如果超过了 2 级评论 就把 parentId 改为上一级评论的 id
    const isExceedLevelTwo = await this.isExceedLevelTwo(parentId)
    const newPost = await this.prisma.post.create({
      data: {
        userName,
        content,
      },
    })
    const p1 = await this.prisma.reply.findFirst({
      where: { postId: parentId },
    })
    const newParentId = isExceedLevelTwo ? p1.parentId : parentId
    await this.prisma.reply.create({
      data: {
        parentId: newParentId,
        userName,
        postId: newPost.id,
      },
    })
  }

  async delete({ parentId, postId }: DeleteReplyInput) {
    this.prisma.post.delete({
      where: {
        id: postId,
      },
    })
    const reply = await this.prisma.reply.findFirst({
      where: {
        AND: {
          postId,
          parentId,
        },
      },
    })
    await this.prisma.reply.delete({
      where: {
        id: reply.id,
      },
    })
  }
}
