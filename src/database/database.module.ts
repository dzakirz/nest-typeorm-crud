import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        username: configService.getOrThrow('MYSQL_USERNAME'),
        password: configService.getOrThrow('MYSQL_PASSWORD'),
        host: configService.getOrThrow('MYSQL_HOST'),
        port: configService.getOrThrow('MYSQL_PORT'),
        database: configService.getOrThrow('MYSQL_DATABASE'),
        autoLoadEntities: true,
        synchronize: configService.getOrThrow('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
