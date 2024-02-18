import { Module } from '@nestjs/common'
import { SocialController } from './social.controller'
import { SocialService } from './social.service'
import { PrismaModule } from '../prisma'

@Module({
  imports: [PrismaModule],
  controllers: [SocialController],
  providers: [SocialService],
})
export class SocialModule {}
