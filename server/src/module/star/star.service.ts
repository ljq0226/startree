import { Injectable } from '@nestjs/common'
import { CreateStarInput } from './dto/create-star.input'
import { UpdateStarInput } from './dto/update-star.input'

@Injectable()
export class StarService {
  create(createStarInput: CreateStarInput) {
    return 'This action adds a new star'
  }

  findAll() {
    return 'This action returns all star'
  }

  findOne(id: number) {
    return `This action returns a #${id} star`
  }

  update(id: number, updateStarInput: UpdateStarInput) {
    return `This action updates a #${id} star`
  }

  remove(id: number) {
    return `This action removes a #${id} star`
  }
}
