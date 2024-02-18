import { Test, TestingModule } from '@nestjs/testing'
import { MenuService } from './menu.service'
import { PrismaModule } from '@/modules/prisma'

describe('MenuService', () => {
  let service: MenuService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [MenuService],
    }).compile()

    service = module.get<MenuService>(MenuService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
