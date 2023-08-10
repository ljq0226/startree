import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field(() => String)
  content: string;
  @Field(() => String)
  userName: string; 
}
