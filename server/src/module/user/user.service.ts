import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { FollowService } from '../follow/follow.service'
import { CreateUserInput } from './dto/create-user.input'

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly followService: FollowService,

  ) {}

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

  async profileCount(name: string) {
    const followings = await this.prisma.follow.count({
      where: {
        name,
      },
    })
    const followed = await this.prisma.follow.count({
      where: {
        followedName: name,
      },
    })
    const posts = await this.prisma.post.count({
      where: {
        userName: name,
      },
      orderBy: {
        id: 'desc',
      },
    })
    return {
      posts,
      followings,
      followed,
    }
  }

  async profileData(name: string) {
    const followings = await this.followService.findFollowings(name)
    const followed = await this.followService.findFollowed(name)
    const posts = await this.prisma.post.findMany({
      where: {
        userName: name,
      },
      include: {
        User: true,
      },
    })
    return { posts, followed, followings }
  }
}
