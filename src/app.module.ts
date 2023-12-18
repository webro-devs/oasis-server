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
import { TourModule } from './modules/tour/tour.module';
import { EventModule } from './modules/event/event.module';
import { DestinationModule } from './modules/destination/destination.module';
import { AttractionContentModule } from './modules/attraction-content/attraction-content.module';
import { DestinationTypeModule } from './modules/destination-type/destination-type.module';

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
    AttractionContentModule,
    AuthModule,
    DestinationModule,
    DestinationTypeModule,
    EventModule,
    FeedbackModule,
    NewsModule,
    PageModule,
    PageContentModule,
    TagModule,
    TourModule,
    UserModule,
  ],
})
export class AppModule {}
