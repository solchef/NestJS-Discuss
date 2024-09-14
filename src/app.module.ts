import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { QuestionsModule } from './questions/questions.module';
import { TagsModule } from './tags/tags.module';
import * as path from 'path';
import { AnswersModule } from './answers/answers.module';
import { CommentsModule } from './comments/comments.module';
import { CategoriesModule } from './categories/categories.module';
import { PostsModule } from './posts/posts.module';
import { TelegramBotService } from './telegram-bot/telegram-bot.service';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true, // Makes ConfigModule available globally

    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    FilesModule,
    QuestionsModule,
    TagsModule,
    AnswersModule,
    CommentsModule,
    CategoriesModule,
    PostsModule,
    TelegramBotModule,
  ]
})
export class AppModule {}
