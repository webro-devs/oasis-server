import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Souvenir } from './souvenir.entity';
import { SouvenirService } from './souvenir.service';
import { SouvenirController } from './souvenir.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Souvenir])],
  controllers: [SouvenirController],
  providers: [SouvenirService],
  exports: [SouvenirService],
})
export class SouvenirModule {}
