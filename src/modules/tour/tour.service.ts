import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateTourDto, CreateTourDto } from './dto';
import { Tour } from './tour.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TourContentService } from '../tour-content/tour-content.service';
import { ConfigService } from '@nestjs/config';
import slugify from 'slugify';
import { TourPriceService } from '../tour-price/tour-price.service';
import { TourItineraryService } from '../tour-itinerary/tour-itinerary.service';

@Injectable()
export class TourService {
  constructor(
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>,
    private readonly tourContService: TourContentService,
    private readonly configService: ConfigService,
    private readonly tourPriceService: TourPriceService,
    private readonly tourItineraryService: TourItineraryService
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
      await this.tourContService.change(value.about, tour,'tourAbout');
    }

    if (value?.book?.length) {
      await this.tourContService.change(value.book, tour,'tourBook');
    }

    if (value?.specification?.length) {
      await this.tourContService.change(value.specification, tour,'tourSpecification');
    }

    if (value?.price?.length) {
      await this.tourPriceService.change(value.price, tour.id);
    }
  }

  async create(value: CreateTourDto) {
    const title = value.about.find((c) => c.langCode == 'en')?.title;

    if (!title) {
      throw new HttpException('title in english should be exist in about', 400);
    }

    const url = await this.makeUrl('tour/', title);
    const routes = value.routes
    const tour = await this.createTour(url, {
      tourCategory: value.tourCategory,
      photoGallery: value?.photoGallery || [],
      routes,
      destination: value?.destination,
      photo: value?.photo || null
    });

    if (value?.about?.length) {
      await this.tourContService.create(value.about, tour,'tourAbout');
    }

    if (value?.name?.length) {
      await this.tourContService.create(value.name, tour,'tourName');
    }

    if (value?.book?.length) {
      await this.tourContService.create(value.book, tour,'tourBook');
    }

    if (value?.itinerary?.length) {
      await this.tourItineraryService.create(value.itinerary, tour)
    }

    if (value?.specification?.length) {
      await this.tourContService.create(value.specification, tour,'tourSpecification');
    }

    if (value?.price?.length) {
      await this.tourPriceService.create(value.price, tour.id);
    }

    return tour;
  }

  async createTour(url: string, value) {
    const data = await this.tourRepository
      .createQueryBuilder()
      .insert()
      .into(Tour)
      .values({ url, ...value } as unknown as Tour)
      .returning('id')
      .execute();

    return await this.tourRepository.findOne({ where: { id: data.raw[0].id } });
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
