import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CreateLikeInput } from './dto/create-like.input'
import { DeleteLikeInput } from './dto/delete-like.input'

@Injectable()
export class LikeService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create({ postId, userName }: CreateLikeInput) {
    return await this.prisma.like.create({
      data: {
        userName,
        postId,
      },
    })
  }

  async delete({ postId, userName }: DeleteLikeInput) {
    const like = await this.prisma.like.findFirst({
      where: {
        userName,
        postId,
      },
    })
    await this.prisma.like.delete({
      where: { id: like.id },
    })
    return true
  }
}
