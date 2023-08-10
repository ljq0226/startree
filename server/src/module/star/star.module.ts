import { Module } from '@nestjs/common';
import { StarService } from './star.service';
import { StarResolver } from './star.resolver';

@Module({
  providers: [StarResolver, StarService]
})
export class StarModule {}
