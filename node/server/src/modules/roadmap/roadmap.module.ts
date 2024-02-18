import { Module } from '@nestjs/common'
import { RoadmapController } from './roadmap.controller'
import { RoadmapService } from './roadmap.service'
import { PrismaModule } from '../prisma'

@Module({
  imports: [PrismaModule],
  controllers: [RoadmapController],
  providers: [RoadmapService],
})
export class RoadmapModule {}
