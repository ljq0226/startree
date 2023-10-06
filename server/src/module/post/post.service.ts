import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { checkTag, createTag } from 'src/lib'
import { FollowService } from '../follow/follow.service'
import { UserService } from '../user/user.service'
import { CreatePostInput } from './dto/create-post.input'

const PAGE_SIZE = 10
@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private readonly followService: FollowService,
    private readonly userService: UserService,
  ) {}

  async create({ content, userName }: CreatePostInput) {
    const [existTags, notExistTags] = checkTag(content)
    const tagIds = await Promise.all([
      ...existTags.map(async (item) => {
        const tag = await this.prisma.tag.findFirst({ where: { name: item } })
        return tag.id
      }),
      ...notExistTags.map(async (item) => {
        const newTag = await this.prisma.tag.create({ data: { name: item } })
        return newTag.id
      }),
    ])

    const newPost = await this.prisma.post.create({
      data: {
        content: createTag(notExistTags, content),
        userName,
      },
    })
    await this.prisma.post.update({
      where: {
        id: newPost.id,
      },
      data: {
        tags: {
          connect: tagIds.map(tagId => ({ id: tagId })),
        },
      },
    })

    return this.getPostById(newPost.id, userName)
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
            forwardPostId: id,
          },
        ],
      },
    }))
    return {
      reply, like, forward, isStar, isForward, isLike, isReply,
    }
  }

  async findAllPost(name: string, pageIndex: number) {
    const posts = await this.prisma.post.findMany({
      select: {
        id: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: PAGE_SIZE * (pageIndex - 1),
      take: PAGE_SIZE,
    })
    const postIds = posts.map(item => item.id)
    return this.getPostInfoByIds([...postIds], name)
  }

  async getPostInfoByIds(postIds: number[], name: string) {
    return await Promise.all(postIds.map(async (id: number) => {
      return await this.getPostById(id, name)
    }))
  }

  async getHomePost(name: string, pageIndex: number) {
    const followingUsers = await this.prisma.follow.findMany({
      where: {
        name,
      },
      select: {
        followedName: true,
      },
    })
    const arr = followingUsers.map(item => item.followedName)
    const usersName = [...arr, name]
    const posts = await this.prisma.post.findMany({
      where: {
        userName: {
          in: usersName,
        },
      },
      select: {
        id: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: PAGE_SIZE * (pageIndex - 1),
      take: PAGE_SIZE,
    })
    const postIds = posts.map(item => item.id)
    return this.getPostInfoByIds([...postIds], name)
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

  async getParentPostReply(postId: number, name: string) {
    const idArr = [postId]
    const p1 = await this.prisma.reply.findFirst({
      where: {
        postId,
      },
    })
    if (p1) {
      idArr.unshift(p1.parentId)
      const p2 = await this.prisma.reply.findFirst({
        where: {
          postId: p1.parentId,
        },
      })
      if (p2)
        idArr.unshift(p2.parentId)
    }

    return Promise.all(idArr.map(async (id) => {
      return await this.getPostById(id, name)
    }))
  }

  async getPostById(id: number, name: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { user: true, replys: true },
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
  }

  async getPostByTag(tagName: string, name: string) {
    const tag = await this.prisma.tag.findFirst({ where: { name: tagName }, include: { posts: true } })
    const postIds = tag.posts.map(item => item.id)
    return this.getPostInfoByIds([...postIds], name)
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

  async getPostReply(postId: number, name: string) {
    const replys = await this.prisma.reply.findMany({
      where: {
        parentId: postId,
      },
      include: {
        post: {
          include: {
            replys: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    const res = await Promise.all(replys.map(async (reply) => {
      const post = await this.getPostById(reply.postId, name)
      const child = await this.getPostReply(post.id, name)
      return {
        ...post,
        replys: child,
      }
    }))
    return res
  }

  async delete(id: number) {
    await this.prisma.post.delete({
      where: {
        id,
      },
    })
    return true
  }
}
