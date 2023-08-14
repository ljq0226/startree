import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { FollowService } from '../follow/follow.service'
import { UserService } from '../user/user.service'
import { CreatePostInput } from './dto/create-post.input'
import { UpdatePostInput } from './dto/update-post.input'

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private readonly followService: FollowService,
    private readonly userService: UserService,
  ) {}

  async create({ content, userName }: CreatePostInput) {
    const newPost = await this.prisma.post.create({
      data: {
        content,
        userName,
      },
    })
    return newPost
  }

  async postCount(id: number, name: string) {
    const reply = await this.prisma.reply.count({
      where: {
        parentId: id,
      },
    })
    const like = await this.prisma.like.count({
      where: {
        postId: id,
      },
    })
    const forward = await this.prisma.forward.count({
      where: {
        forwardPostId: id,
      },
    })
    const isStar = !!(await this.prisma.star.findFirst({
      where: {
        AND: [
          {
            userName: name,
          },
          {
            postId: id,
          },
        ],
      },
    }))
    const isReply = !!(await this.prisma.reply.findFirst({
      where: {
        AND: [
          {
            userName: name,
          },
          {
            postId: id,
          },
        ],
      },
    }))
    const isLike = !!(
      await this.prisma.like.findFirst({
        where: {
          AND: [
            {
              userName: name,
            },
            {
              postId: id,
            },
          ],
        },
      })
    )

    const isForward = !!(await this.prisma.forward.findFirst({
      where: {
        AND: [
          {
            userName: name,
          },
          {
            postId: id,
          },
        ],
      },
    }))
    return {
      reply, like, forward, isStar, isForward, isLike, isReply,
    }
  }

  async findAllPost(name: string) {
    const posts = await this.prisma.post.findMany({
      select: {
        id: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    const postIds = posts.map(item => item.id)
    return this.getPostInfoByIds([...postIds], name)
  }

  async getPostInfoByIds(postIds: number[], name: string) {
    return await Promise.all(postIds.map(async (id: any) => {
      const post = await this.prisma.post.findUnique({
        where: { id },
        include: { user: true },
      })
      const postId = post.id
      const profile = await this.getProfileByName(post.user.name)
      const user = {
        name: post.user.name,
        nickName: post.user.nickName,
        image: post.user.image,
        bio: profile.bio,
      }
      const postCount = await this.postCount(postId, name)
      const profileCount = await this.userService.profileCount(user.name)
      const res = {
        id: postId,
        content: post.content,
        createdAt: post.createdAt,
        user,
        postCount,
        profileCount,
      }
      return res
    }))
  }

  async findHomePost(name: string) {
    const followedPosts = (await this.followService.findFollowings(name)).map((user) => {
      return user.posts
    })
    const user = await this.prisma.user.findUnique({
      where: { name },
      include: {
        posts: {
          include: {
            user: true,
            replys: true,
            tags: true,
            likes: true,
          },
        },
      },
    })
    const userPost = user.posts
    const homePosts = [...userPost, ...followedPosts.flat(1)]
    return homePosts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  async profileData(name: string) {
    const followings = await this.followService.findFollowings(name)
    const followed = await this.followService.findFollowed(name)

    const postArr = await this.prisma.post.findMany({
      where: {
        userName: name,
      },
      select: {
        id: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    const postIds = postArr.map(item => item.id)
    const posts = this.getPostInfoByIds(postIds, name)
    return { posts, followed, followings }
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
            post: true,

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

  async getProfileByName(name: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        name,
      },
    })
    const id = user.profileId
    return await this.prisma.profile.findUnique({
      where: { id },
    })
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return `This action updates a #${id} post`
  }

  remove(id: number) {
    return `This action removes a #${id} post`
  }
}
