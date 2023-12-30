import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateTourPriceDto, CreateTourPriceDto } from './dto';
import { TourPrice } from './tour-price.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TourPriceService {
  constructor(
    @InjectRepository(TourPrice)
    private readonly tourPriceRepository: Repository<TourPrice>,
  ) {}

  async deleteOne(id: string) {
    const response = await this.tourPriceRepository.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(values: UpdateTourPriceDto[], tour: string) {
    const newContents = values.filter((pc) => !pc.id);
    const olderContents = values.filter((pc) => pc.id);

    await Promise.all(
      olderContents.map(async (value) => {
        await this.tourPriceRepository.update({ id: value.id }, { ...value });
      }),
    );

    newContents.length ? await this.create(newContents,tour) : null;
  }

  async create(values: CreateTourPriceDto[],tour:string) {
    await Promise.all(
      values.map(async (value) => {
          await this.tourPriceRepository
        .createQueryBuilder()
        .insert()
        .into(TourPrice)
        .values({...value,tour} as unknown as TourPrice)
        .execute()
      }),
    );
  }
}
