import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PubSub } from 'graphql-subscriptions';

export const PUB_SUB = 'PUB_SUB';

// @Module({
//   imports: [ConfigModule],
//   providers: [
//     {
//       provide: PUB_SUB,
//       useFactory: (configService: ConfigService) =>
//         new RedisPubSub({
//           connection: {
//             host: configService.get('REDIS_HOST'),
//             port: configService.get('REDIS_PORT'),
//           },
//         }),
//       inject: [ConfigService],
//     },
//   ],
//   exports: [PUB_SUB],
// })
@Global()
@Module({
  providers: [
    {
      provide: PUB_SUB,
      useValue: new PubSub(),
    },
  ],
  exports: [PUB_SUB],
})
export class PubSubModule {}
