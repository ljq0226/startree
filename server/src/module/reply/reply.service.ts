import { Injectable } from '@nestjs/common';
import { CreateReplyInput } from './dto/create-reply.input';
import { UpdateReplyInput } from './dto/update-reply.input';

@Injectable()
export class ReplyService {
  create(createReplyInput: CreateReplyInput) {
    return 'This action adds a new reply';
  }

  findAll() {
    return `This action returns all reply`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reply`;
  }

  update(id: number, updateReplyInput: UpdateReplyInput) {
    return `This action updates a #${id} reply`;
  }

  remove(id: number) {
    return `This action removes a #${id} reply`;
  }
}
