import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CreatePostInput } from './dto/create-post.input'
import { UpdatePostInput } from './dto/update-post.input'

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  async create({ content, userName }: CreatePostInput) {
    const newPost = await this.prisma.post.create({
      data: {
        content,
        userName,
      },
    })
    return newPost
  }

  async findAllPost() {
    return await this.prisma.post.findMany({
      include: {
        User: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  findPostByTag(id: number) {
    return `This action returns a #${id} post`
  }

  async findPostByUser(name: string) {
    const posts = await this.prisma.post.findMany({
      where: {
        userName: name,
      },
    })
    return posts
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return `This action updates a #${id} post`
  }

  remove(id: number) {
    return `This action removes a #${id} post`
  }
}
