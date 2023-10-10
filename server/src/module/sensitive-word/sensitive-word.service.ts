import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class SensitiveWordService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    return this.prisma.sensitiveWord.findMany({
      orderBy: {
        id: 'desc',
      },
    })
  }

  async deleteWord(id: number) {
    await this.prisma.sensitiveWord.delete({
      where: { id },
    })
    return true
  }

  async createWord(word: string) {
    await this.prisma.sensitiveWord.create({
      data: {
        word,
      },
    })
    return true
  }
}
