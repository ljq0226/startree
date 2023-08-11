import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import { logger } from './common/middleware/logger.middleware'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  app.enableCors()
  app.use(logger)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(8000)
}
bootstrap()
