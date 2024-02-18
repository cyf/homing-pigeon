import { Module } from '@nestjs/common'
import { MenuService } from './menu.service'
import { MenuController } from './menu.controller'
import { PrismaModule } from '@/modules/prisma'

@Module({
  imports: [PrismaModule],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
