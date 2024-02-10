import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Static } from './static.entity';
import { StaticController } from './static.controller';
import { StaticService } from './static.service';

@Module({
  imports: [TypeOrmModule.forFeature([Static])],
  controllers: [StaticController],
  providers: [StaticService],
  exports: [StaticService],
})
export class StaticModule {}
