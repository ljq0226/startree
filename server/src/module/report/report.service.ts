import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CreateReportInput } from './dto/create-report.input'
import { UpdateReportInput } from './dto/update-report.input'

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}
  create(createReportInput: CreateReportInput) {
    return 'This action adds a new report'
  }

  async findAll() {
    return await this.prisma.report.findMany()
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
