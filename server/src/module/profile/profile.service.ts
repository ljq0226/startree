import { Injectable } from '@nestjs/common'
import { CreateProfileInput } from './dto/create-profile.input'
import { UpdateProfileInput } from './dto/update-profile.input'

@Injectable()
export class ProfileService {
  create(createProfileInput: CreateProfileInput) {
    return 'This action adds a new profile'
  }

  findAll() {
    return 'This action returns all profile'
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`
  }

  update(id: number, updateProfileInput: UpdateProfileInput) {
    return `This action updates a #${id} profile`
  }

  remove(id: number) {
    return `This action removes a #${id} profile`
  }
}
