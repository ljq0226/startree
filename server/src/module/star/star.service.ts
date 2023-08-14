import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CreateStarInput } from './dto/create-star.input'
import { DeleteStarInput } from './dto/delete-star.input'

@Injectable()
export class StarService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async findFirst(postId: number, userName: string) {
    return await this.prisma.star.findFirst({
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
    })
  }

  async create({ postId, userName }: CreateStarInput) {
    const star = await this.findFirst(postId, userName)
    if (!star) {
      await this.prisma.star.create({
        data: {
          userName,
          postId,
        },
      })
      return true
    }
    return false
  }

  async delete({ postId, userName }: DeleteStarInput) {
    const star = await this.findFirst(postId, userName)
    if (star) {
      await this.prisma.star.delete({
        where: { id: star.id },
      })
      return true
    }
    return false
  }
}
