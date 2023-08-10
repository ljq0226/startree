import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Forward {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
