import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Tag {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
