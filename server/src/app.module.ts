import { join } from 'node:path'
import { Module } from '@nestjs/common'
import { PrismaModule } from 'nestjs-prisma'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { AppService } from './app.service'
import { AppController } from './app.controller'
import { UserModule } from './module/user/user.module'
import { PostModule } from './module/post/post.module'
import { FollowModule } from './module/follow/follow.module'
import { LikeModule } from './module/like/like.module'
import { ForwardModule } from './module/forward/forward.module'
import { StarModule } from './module/star/star.module'
import { ReplyModule } from './module/reply/reply.module'
import { TagModule } from './module/tag/tag.module'

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {},
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    UserModule,
    PostModule,
    FollowModule,
    LikeModule,
    ForwardModule,
    StarModule,
    ReplyModule,
    TagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
