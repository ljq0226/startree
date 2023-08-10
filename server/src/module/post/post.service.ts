import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class PostService {
  constructor(private prisma:PrismaService){}
  async create({content,userName}: CreatePostInput) {
    const newPost =await this.prisma.post.create({
      data:{
        content,
        userName,
      }
    })
    return newPost
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
