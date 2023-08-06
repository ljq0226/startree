import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'nestjs-prisma';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [
    PrismaModule.forRoot({
    isGlobal: true,
    prismaServiceOptions: {},
  }),
    UserModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

