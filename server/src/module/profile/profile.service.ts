import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class ProfileService {
  constructor(
    private prisma: PrismaService,
  ) {}

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
}
