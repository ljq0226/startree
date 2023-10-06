import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CreateReportInput } from './dto/create-report.input'
import { UpdateReportInput } from './dto/update-report.input'

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}
  async create({ reporter, content, reason, postId }: CreateReportInput) {
    const { userName } = await this.prisma.post.findUnique({ where: { id: postId } })
    const newReport = await this.prisma.report.create({
      data: {
        reason,
        reporter,
        postId,
        content,
        reported: userName,
      },
    })
    return true
  }

  findAll() {
    return 'This action returns all report'
  }

  findOne(id: number) {
    return `This action returns a #${id} report`
  }

  update(id: number, updateReportInput: UpdateReportInput) {
    return `This action updates a #${id} report`
  }

  remove(id: number) {
    return `This action removes a #${id} report`
  }
}
