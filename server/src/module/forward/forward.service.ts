import { Injectable } from '@nestjs/common';
import { CreateForwardInput } from './dto/create-forward.input';
import { UpdateForwardInput } from './dto/update-forward.input';

@Injectable()
export class ForwardService {
  create(createForwardInput: CreateForwardInput) {
    return 'This action adds a new forward';
  }

  findAll() {
    return `This action returns all forward`;
  }

  findOne(id: number) {
    return `This action returns a #${id} forward`;
  }

  update(id: number, updateForwardInput: UpdateForwardInput) {
    return `This action updates a #${id} forward`;
  }

  remove(id: number) {
    return `This action removes a #${id} forward`;
  }
}
