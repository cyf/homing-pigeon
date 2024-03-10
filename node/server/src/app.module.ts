import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import {
  APP_FILTER,
  APP_PIPE,
  APP_INTERCEPTOR,
  APP_GUARD,
  RouterModule,
} from '@nestjs/core'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { CacheModule, CacheStore } from '@nestjs/cache-manager'
import { ThrottlerGuard, ThrottlerModule, seconds } from '@nestjs/throttler'
import { redisStore } from 'cache-manager-redis-store'
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis'
import {
  I18nModule,
  AcceptLanguageResolver,
  QueryResolver,
  CookieResolver,
  HeaderResolver,
} from 'nestjs-i18n'
import { join } from 'path'
import * as yaml from 'js-yaml'
import { readFileSync } from 'fs'
import {
  AuthModule,
  UserModule,
  CarouselModule,
  ConfigModule as CustomConfigModule,
  EmojiModule,
  FeedbackModule,
  RoadmapModule,
  SocialModule,
  SocketIoModule,
  HealthModule,
  PrismaModule,
  PermissionModule,
  RoleModule,
  RoleMenuModule,
  RolePermissionModule,
  UserRoleModule,
  UserPermissionModule,
  MenuModule,
  // WsModule,
} from './modules'
import { LoggerMiddleware } from './common/middlewares/logger.middleware'
import { HeadersMiddleware } from './common/middlewares/headers.middleware'
import { ReplayAttackMiddleware } from './common/middlewares/replay-attack.middleware'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { ValidationPipe } from './common/pipes/validation.pipe'
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor'
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor'
import { ResponseInterceptor } from './common/interceptors/response.interceptor'
import { type RedisOptions } from 'ioredis'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => {
          return yaml.load(
            readFileSync(join(__dirname, '..', 'config.yaml'), 'utf8'),
          ) as Record<string, any>
        },
      ],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host: process.env.KV_HOST,
            port: +process.env.KV_PORT,
            tls: true,
          },
          username: process.env.KV_USERNAME,
          password: process.env.KV_PASSWORD,
          ttl: 60,
        })
        return {
          store: store as unknown as CacheStore,
        }
      },
    }),
    ThrottlerModule.forRootAsync({
      useFactory: () => ({
        throttlers: [{ limit: 10, ttl: seconds(60) }],
        storage: new ThrottlerStorageRedisService({
          host: process.env.KV_HOST,
          port: +process.env.KV_PORT,
          username: process.env.KV_USERNAME,
          password: process.env.KV_PASSWORD,
          tls: true,
          maxRetriesPerRequest: 20,
        } as unknown as RedisOptions),
      }),
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.getOrThrow('fallback_language'),
        loaderOptions: {
          path: join(__dirname, '..', 'i18n/'),
          watch: true,
        },
      }),
      resolvers: [
        { use: QueryResolver, options: ['x-locale'] },
        new HeaderResolver(['x-locale']),
        new CookieResolver(['__homing_pigeon_lng__']),
        AcceptLanguageResolver,
      ],
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api/(.*)'],
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    UserRoleModule,
    UserPermissionModule,
    RoleModule,
    MenuModule,
    PermissionModule,
    RoleMenuModule,
    RolePermissionModule,
    CustomConfigModule,
    CarouselModule,
    EmojiModule,
    FeedbackModule,
    RoadmapModule,
    SocialModule,
    RouterModule.register([
      {
        path: '/api',
        children: [
          AuthModule,
          {
            path: '/user',
            module: UserModule,
            children: [UserRoleModule, UserPermissionModule],
          },
          {
            path: '/role',
            module: RoleModule,
            children: [RoleMenuModule, RolePermissionModule],
          },
          PermissionModule,
          MenuModule,
          CustomConfigModule,
          CarouselModule,
          EmojiModule,
          FeedbackModule,
          RoadmapModule,
          SocialModule,
          HealthModule,
        ],
      },
    ]),
    SocketIoModule,
    // WsModule,
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, HeadersMiddleware, ReplayAttackMiddleware)
      .forRoutes('*')
  }
}
