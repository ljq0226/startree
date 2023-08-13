import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CreateStarInput } from './dto/create-star.input'
import { DeleteStarInput } from './dto/delete-star.input'

@Injectable()
export class StarService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create({ postId, userName }: CreateStarInput) {
    return await this.prisma.star.create({
      data: {
        userName,
        postId,
      },
    })
  }

  async delete({ postId, userName }: DeleteStarInput) {
    const star = await this.prisma.star.findFirst({
      where: {
        userName,
        postId,
      },
    })
    await this.prisma.star.delete({
      where: { id: star.id },
    })
    return true
  }
}
