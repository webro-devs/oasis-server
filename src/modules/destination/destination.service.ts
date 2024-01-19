import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateDestinationDto, CreateDestinationDto } from './dto';
import { Destination } from './destination.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PageService } from '../page/page.service';
import { ConfigService } from '@nestjs/config';
import slugify from 'slugify';

@Injectable()
export class DestinationService {
  constructor(
    @InjectRepository(Destination)
    private readonly destinationRepository: Repository<Destination>,
    private readonly pageService: PageService,
    private readonly configService: ConfigService,
  ) {}

  async getAll(langCode: string) {
    const data = await this.destinationRepository.find({
      where: {
        page: {
          contents: {
            langCode,
          },
        },
      },
      order: {
        index: 'ASC',
      },
      relations: {
        page: {
          pagesOnLeft: true,
          pagesOnRight: true,
          contents: true,
        },
      },
      select: {
        title:true,
        index:true,
        page: {
          id: true,
          url: true,
          contents: {
            shortTitle: true,
          },
        },
      },
    });
    return data;
  }

  async getAllForSite(langCode: string) {
    const data = await this.destinationRepository.find({
      where: {
        page: {
          contents: {
            langCode,
          },
        },
      },
      order: {
        index: 'ASC',
      },
      relations: {
        page: {
          contents: true,
        },
      },
      select: {
        page: {
          id: true,
          contents: {
            shortTitle: true,
          },
        },
      },
    });

    const res = []
    data.forEach(d=>{
      res.push({
        id:d.id,
        shortTitle:d.page.contents[0].shortTitle,
        title: d.title
      })
    })
    return res;
  }

  async getOne(slug: string, langCode: string) {
    const data = await this.destinationRepository
      .findOne({
        relations: {
          page: {
            pagesOnLeft: {
              contents: true,
            },
            pagesOnRight: {
              contents: true,
            },
            contents: true,
          },
        },
        where: {
          slug,
          page: {
            contents: {
              langCode,
            },
          },
        },
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    data.page.pagesOnLeft.forEach((pr) => {
      pr.contents = pr.contents.filter((c) => c.langCode == langCode);
      pr.contents.forEach((c) => {
        delete c.descriptionPage;
      });
    });

    data.page.pagesOnRight.forEach((pr) => {
      pr.contents = pr.contents.filter((c) => c.langCode == langCode);
      pr.contents.forEach((c) => {
        delete c.description;
        delete c.title;
        delete c.descriptionPage;
      });
    });

    return data;
  }

  async getByTitle(slug: string, langCode: string) {
    const data = await this.destinationRepository.findOne({
      where: {
        slug,
      },
    });

    if (!data) return {};

    return await this.getOne(data.id, langCode);
  }

  async deleteOne(id: string) {
    const response = await this.destinationRepository.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(value: UpdateDestinationDto, id: string) {
    const destination = await this.destinationRepository.findOne({
      where: { id },
      relations: {
        page: true,
      },
    });

    await this.pageService.change(value, destination.page.id);
  }

  async create(value: CreateDestinationDto) {
    const title = value.contents.find((c) => c.langCode == 'en')
      ?.title;
    if (!title) {
      throw new HttpException('title in english should be exist', 400);
    }

    const destination = new Destination();
    destination.slug = await this.makeSlug(title)
    await this.destinationRepository.save(destination);

    await this.pageService.create(
      value,
      { destination, isTopic: false },
      { path: 'destination/', short: true },
    );
    return destination;
  }

  async makeSlug(title: string) {
    const slug = slugify(title, { lower: true });

    const isExist = await this.destinationRepository.findOne({
      where: { slug },
    });

    if (isExist) {
      return await this.makeSlug(slug + '_')
    }

    return slug;
  }
}
