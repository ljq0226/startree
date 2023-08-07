import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/module/post/entities/post.entity';

@ObjectType()
export class User {
  @Field(() => String, { description: 'user name' })
  name: string;

  @Field(() => String, { description: 'user email' })
  email: string;

  @Field(() => String, { description: 'user image' })
  image: string;

  @Field(() => String, { description: 'user nickname' })
  nickName: string;

  @Field(()=>[Post])
  posts:Post[]


  @Field(() => Date, { description: 'createdTime' })
  createdAt: Date;
  @Field(() => Date, { description: 'updatedTime' })
  updatedAt: Date;


}
