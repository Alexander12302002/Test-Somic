import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `${configService.get<string>('MONGO_ACCESS')}${configService.get<string>('MONGO_USER')}:${configService.get<string>('MONGO_PWD')}@${configService.get<string>('MONGO_HOST')}/${configService.get<string>('MONGO_DB_NAME')}`,
        authSource: 'admin',
      }),
      inject: [ConfigService],
      connectionName: 'db1',
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
