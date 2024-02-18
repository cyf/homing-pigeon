import { Inject, Injectable } from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { IsDel } from '@prisma/client'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { encrypt, hashed } from '@/common/utils/crypto'
import { decrypt } from '@/common/utils/privacy'
import { PrismaService } from '@/modules/prisma'

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async getHello() {
    // await this.cacheManager.set('user-hello', 'Kimmy')
    return await this.cacheManager.get<string | undefined>('user-hello')
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, nickname, password, email, phone, avatar } = createUserDto
    return this.prismaService.user.create({
      data: {
        username,
        nickname,
        password: password ? hashed(encrypt(decrypt(password))) : null,
        email,
        phone,
        avatar,
      },
      select: {
        id: true,
        username: true,
        nickname: true,
        email: true,
        email_verified: true,
        phone: true,
        phone_verified: true,
        avatar: true,
        create_date: true,
        update_date: true,
      },
    })
  }

  async findAll(): Promise<Array<User>> {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        username: true,
        nickname: true,
        email: true,
        email_verified: true,
        phone: true,
        phone_verified: true,
        avatar: true,
        create_date: true,
        update_date: true,
      },
      where: {
        is_del: IsDel.NO,
      },
    })
  }

  async findOne(id: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      select: {
        id: true,
        username: true,
        nickname: true,
        email: true,
        email_verified: true,
        phone: true,
        phone_verified: true,
        avatar: true,
        create_date: true,
        update_date: true,
      },
      where: {
        id,
        is_del: IsDel.NO,
      },
    })
  }

  async findUserPermissions(id: string) {
    return this.prismaService.user.findUnique({
      select: {
        id: true,
        username: true,
        nickname: true,
        password: true,
        email: true,
        phone: true,
        avatar: true,
        roles: {
          select: {
            user_id: true,
            role_id: true,
            role: {
              select: {
                id: true,
                name: true,
                description: true,
                create_by: true,
                create_date: true,
                update_by: true,
                update_date: true,
                permissions: {
                  select: {
                    id: true,
                    role_id: true,
                    permission_id: true,
                    permission: {
                      select: {
                        id: true,
                        name: true,
                        description: true,
                        create_by: true,
                        create_date: true,
                        update_by: true,
                        update_date: true,
                      },
                    },
                  },
                  where: {
                    is_del: IsDel.NO,
                  },
                },
                menus: {
                  select: {
                    id: true,
                    role_id: true,
                    menu_id: true,
                    menu: {
                      select: {
                        id: true,
                        path: true,
                        title: true,
                        icon: true,
                        order: true,
                        shown: true,
                        menu_type: true,
                        parent_id: true,
                        create_by: true,
                        create_date: true,
                        update_by: true,
                        update_date: true,
                        permission_id: true,
                        permission: {
                          select: {
                            id: true,
                            name: true,
                            description: true,
                          },
                          where: {
                            is_del: IsDel.NO,
                          },
                        },
                      },
                    },
                  },
                  where: {
                    is_del: IsDel.NO,
                  },
                },
              },
            },
          },
          where: {
            is_del: IsDel.NO,
          },
        },
        permissions: {
          select: {
            id: true,
            user_id: true,
            permission_id: true,
            permission: {
              select: {
                id: true,
                name: true,
                description: true,
                create_by: true,
                create_date: true,
                update_by: true,
                update_date: true,
              },
            },
          },
          where: {
            is_del: IsDel.NO,
          },
        },
        create_date: true,
        update_date: true,
      },
      where: {
        id,
        is_del: IsDel.NO,
      },
    })
  }

  async findByAccount(account: string) {
    return this.prismaService.user.findFirst({
      select: {
        id: true,
        username: true,
        nickname: true,
        password: true,
        email: true,
        phone: true,
        avatar: true,
        create_date: true,
        update_date: true,
      },
      where: {
        AND: {
          OR: [
            {
              username: account,
            },
            {
              email: account,
            },
            {
              phone: account,
            },
          ],
        },
        is_del: IsDel.NO,
      },
    })
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const { username, nickname, password, email, phone, avatar } = updateUserDto
    return this.prismaService.user.update({
      data: {
        username,
        nickname,
        password: password ? hashed(encrypt(decrypt(password))) : null,
        email,
        phone,
        avatar,
      },
      select: {
        id: true,
        username: true,
        nickname: true,
        email: true,
        email_verified: true,
        phone: true,
        phone_verified: true,
        avatar: true,
        create_date: true,
        update_date: true,
      },
      where: {
        id,
        is_del: IsDel.NO,
      },
    })
  }

  async remove(id: string): Promise<User | null> {
    return this.prismaService.user.update({
      select: {
        id: true,
        username: true,
        nickname: true,
        email: true,
        email_verified: true,
        phone: true,
        phone_verified: true,
        avatar: true,
        create_date: true,
        update_date: true,
      },
      data: {
        is_del: IsDel.YES,
      },
      where: {
        id,
        is_del: IsDel.NO,
      },
    })
  }
}
