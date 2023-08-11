import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { FollowService } from '../follow/follow.service'
import { CreatePostInput } from './dto/create-post.input'
import { UpdatePostInput } from './dto/update-post.input'
import { Post } from './entities/post.entity'

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private readonly followService: FollowService,

  ) {}

  async create({ content, userName }: CreatePostInput) {
    const newPost = await this.prisma.post.create({
      data: {
        content,
        userName,
      },
      include: {
        user: true,
      },
    })
    return newPost
  }

  async findAllPost() {
    return await this.prisma.post.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  async findHomePost(name: string) {
    const followedPosts = (await this.followService.findFollowings(name)).map((user) => {
      return user.posts
    })
    const user = await this.prisma.user.findUnique({ where: { name }, include: { posts: { include: { user: true } } } })
    const userPost = user.posts
    const homePosts = [...userPost, ...followedPosts.flat(1)] as Post[]
    return homePosts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  findPostByTag(id: number) {
    return `This action returns a #${id} post`
  }

  async getPostById(id: number) {
    return await this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        replys: {
          include: {
            user: true,
            Post: true,

          },
        },
        tags: true,
      },
    })
  }

  async findPostByUser(name: string) {
    const posts = await this.prisma.post.findMany({
      where: {
        userName: name,
      },
      include: {
        user: true,
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
