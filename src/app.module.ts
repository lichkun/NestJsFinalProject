import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ApiLogsModule } from './api-logs/api-logs.module';
import { SearchLogsModule } from './search-logs/search-logs.module';
import { MessagesModule } from './messages/messages.module';
import { ImagesModule } from './images/images.module';
import { CategoriesModule } from './categories/categories.module';
import { AdsModule } from './ads/ads.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql', // Змініть на вашу базу (mysql, postgres, sqlite тощо)
      host: 'localhost',
      port: 3308,
      username: 'root',
      password: 'root',
      database: 'nest_project',
      entities: [User], // __dirname + '/**/*.entity{.ts,.js}'
      synchronize: true, // Тільки для розробки, у продакшені вимкніть
      autoLoadEntities: true,
    }),
    AdsModule,
    CategoriesModule,
    ImagesModule,
    MessagesModule,
    SearchLogsModule,
    ApiLogsModule,
  ],
})
export class AppModule {}
