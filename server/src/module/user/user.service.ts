import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create({ name, email, image }: CreateUserInput) {
    return await this.prisma.user.create({
      data: {
        name,
        email,
        image,
        nickName: name,
      },
    })
  }

  async findByAt(query: string) {
    return await this.prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              startsWith: query,
            },
          },
          {
            nickName: {
              startsWith: query,
            },
          },
        ],
      },
      include: {
        posts: true,
      },
    })
  }

  async findAll() {
    return await this.prisma.user.findMany({
      include: {
        posts: true,
      },
    })
  }

  async findOne(name: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        name,
      },
    })
    return user
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
