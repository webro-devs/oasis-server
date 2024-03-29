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
import { TourModule } from './modules/tour/tour.module';
import { EventModule } from './modules/event/event.module';
import { DestinationModule } from './modules/destination/destination.module';
import { AttractionContentModule } from './modules/attraction-content/attraction-content.module';
import { EventContentModule } from './modules/event-content/event-content.module';
import { TransportModule } from './modules/transport/transport.module';
import { RoadTransport } from './modules/road-transport/road-transport.entity';
import { TourCategoryModule } from './modules/tour-category/tour-category.module';
import { TourPriceModule } from './modules/tour-price/tour-price.module';
import { TourItineraryModule } from './modules/tour-itinerary/tour-itinerary.module';
import { LanguageModule } from './modules/language/language.module';
import { StaticModule } from './modules/static/static.module';
import { ContactModule } from './modules/contact/contact.module';
import { TourRouteModule } from './modules/tour-route/tour-route.module';
import { BookTourModule } from './modules/book-tour/book-tour.module';

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
    BookTourModule,
    ContactModule,
    DestinationModule,
    EventContentModule,
    EventModule,
    FeedbackModule,
    LanguageModule,
    PageModule,
    PageContentModule,
    RoadTransport,
    StaticModule,
    TagModule,
    TourCategoryModule,
    TourItineraryModule,
    TourModule,
    TourPriceModule,
    TourRouteModule,
    TransportModule,
    UserModule,
  ]
})
export class AppModule {}
