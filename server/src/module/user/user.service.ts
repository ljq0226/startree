import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { FollowService } from '../follow/follow.service'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly followService: FollowService,
    // private readonly postService: PostService,

  ) {}

  async create({ name, email, image }: CreateUserInput) {
    const user = await this.prisma.user.findUnique({ where: { name }, include: { profile: true } })
    if (!user) {
      return await this.prisma.user.create({
        data: {
          name,
          email,
          image,
          nickName: name,
          profile: {
            create: {
              bio: '',
              website: '',
              github: '',
            },
          },
        },
      })
    }
    else {
      return user
    }
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
      include: {
        profile: true,
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

  async updateUserProfile({ name, nickName, profile }: UpdateUserInput) {
    await this.prisma.profile.update({
      where: {
        id: profile.id,
      },
      data: {
        ...profile,
      },
    })
    const user = await this.prisma.user.update({
      where: {
        name,
      },
      data: {
        nickName,
      },
      include: {
        profile: true,
      },
    })
    return user
  }
}
