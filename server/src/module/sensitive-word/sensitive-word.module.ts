import { Module } from '@nestjs/common';
import { SensitiveWordService } from './sensitive-word.service';
import { SensitiveWordResolver } from './sensitive-word.resolver';

@Module({
  providers: [SensitiveWordResolver, SensitiveWordService]
})
export class SensitiveWordModule {}
