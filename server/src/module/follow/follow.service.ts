import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CreateFollowInput } from './dto/create-follow.input'

@Injectable()
export class FollowService {
  constructor(private prisma: PrismaService) {}

  async findFirst(name: string, followedName: string) {
    return await this.prisma.follow.findFirst({
      where: {
        AND: [
          {
            name,
          },
          {
            followedName,
          },
        ],
      },
    })
  }

  async create({ name, followedName }: CreateFollowInput) {
    const follow = await this.findFirst(name, followedName)
    if (!follow) {
      await this.prisma.follow.create({
        data: {
          name,
          followedName,
        },
      })
      return true
    }
    return false
  }

  async findFollowings(name: string) {
    const followings = await this.prisma.follow.findMany({
      where: {
        name,
      },
    })
    const follingsArr = followings.map(follow => follow.followedName)
    const follingsInfoPromises = follingsArr.map(async (item) => {
      return await this.prisma.user.findUnique({
        where: { name: item },
        include: { posts: { include: { user: true } } },
      })
    })
    const follingsInfo = await Promise.all(follingsInfoPromises)
    return follingsInfo
  }

  async findFollowed(followedName: string) {
    const followed = await this.prisma.follow.findMany({
      where: {
        followedName,
      },
    })
    const followedArr = followed.map(follow => follow.name)
    const followedInfoPromises = followedArr.map(async (item) => {
      return await this.prisma.user.findUnique({
        where: { name: item },
        include: { posts: true },
      })
    })
    const followedInfo = await Promise.all(followedInfoPromises)
    return followedInfo
  }

  async followedCount(followedName: string) {
    return await this.prisma.follow.count({
      where: {
        name: followedName,
      },
    })
  }

  async findIsFollowing(name: string, userName: string) {
    return !!(await this.prisma.follow.findFirst({
      where: {
        AND: [
          { name },
          { followedName: userName },
        ],
      },
    }))
  }

  async remove({ name, followedName }: CreateFollowInput) {
    const follow = await this.findFirst(name, followedName)
    if (follow) {
      await this.prisma.follow.delete({
        where: {
          id: follow.id,
        },
      })
      return true
    }
    return false
  }
}
