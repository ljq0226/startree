import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class TagService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(name: string) {
    return await this.prisma.tag.create({
      data: {
        name,
      },
    })
  }

  async findByHashTag(query: string) {
    return await this.prisma.tag.findMany({
      where: {
        name: {
          startsWith: query,
        },
      },
    })
  }
}
