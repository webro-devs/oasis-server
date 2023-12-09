import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from '../config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PageModule } from './modules/page/page.module';
import { PageContentModule } from './modules/page-content/page-content.module';
import { TagModule } from './modules/tag/tag.module';
import { AttractionModule } from './modules/attraction/attraction.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { NewsModule } from './modules/news/news.module';
import { SouvenirModule } from './modules/souvenir/souvenir.module';
import { TourModule } from './modules/tour/tour.module';
import { EventModule } from './modules/event/event.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
      inject: [ConfigService],
    }),
    AttractionModule,
    AuthModule,
    EventModule,
    FeedbackModule,
    NewsModule,
    PageModule,
    PageContentModule,
    SouvenirModule,
    TagModule,
    TourModule,
    UserModule,
  ],
})
export class AppModule {}
