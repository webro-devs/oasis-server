import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateTourDto, CreateTourDto } from './dto';
import { Tour } from './tour.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TourContentService } from '../tour-content/tour-content.service';
import { ConfigService } from '@nestjs/config';
import slugify from 'slugify';

@Injectable()
export class TourService {
  constructor(
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>,
    private readonly tourContService: TourContentService,
    private readonly configService: ConfigService,
  ) {}

  async getOne(id: string) {
    const data = await this.tourRepository
      .findOne({
        where: { id },
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    return data;
  }

  async deleteOne(id: string) {
    const response = await this.tourRepository.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(value: UpdateTourDto, id: string) {
    const tour = await this.tourRepository.findOne({
      where: { id },
    });

    if (value?.photoGallery?.length) {
      await this.tourRepository.update(
        { id: tour.id },
        { photoGallery: value.photoGallery },
      );
    }

    if (value?.about?.length) {
      await this.tourContService.change(value.about, tour.id);
    }

    if (value?.book?.length) {
      await this.tourContService.change(value.book, tour.id);
    }

    if (value?.itinerary?.length) {
      await this.tourContService.change(value.itinerary, tour.id);
    }

    if (value?.specification?.length) {
      await this.tourContService.change(value.specification, tour.id);
    }
  }

  async create(value: CreateTourDto) {
    const title = value.about.find((c) => c.langCode == 'en')?.title;

    if (!title) {
      throw new HttpException('title in english should be exist in about', 400);
    }

    const url = await this.makeUrl('tour/', title);

    const id = await this.createTour(
      url,
      value.tourCategory,
      value?.photoGallery || [],
    );

    if (value?.about?.length) {
      await this.tourContService.create(value.about, id);
    }

    if (value?.book?.length) {
      await this.tourContService.create(value.book, id);
    }

    if (value?.itinerary?.length) {
      await this.tourContService.create(value.itinerary, id);
    }

    if (value?.specification?.length) {
      await this.tourContService.create(value.specification, id);
    }
    return 'Created';
  }

  async createTour(url: string, tourCategory: string, photoGallery) {
    const data = await this.tourRepository
      .createQueryBuilder()
      .insert()
      .into(Tour)
      .values({ url, tourCategory, photoGallery } as unknown as Tour)
      .returning('id')
      .execute();

    return data.raw[0].id;
  }

  async makeUrl(path: string, title: string) {
    const url =
      this.configService.get('clientUrl') +
      path +
      slugify(title, { lower: true });

    const isExist = await this.tourRepository.findOne({
      where: { url },
    });

    if (isExist) {
      return url + '_';
    }

    return url;
  }
}
