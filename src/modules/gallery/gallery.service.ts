import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateGalleryDto, CreateGalleryDto } from './dto';
import { Gallery } from './gallery.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GalleryContentService } from '../gallery-content/gallery-content.service';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import slugify from 'slugify';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private readonly galleryRepository: Repository<Gallery>,
    private readonly galleryConSer: GalleryContentService,
    private readonly configService: ConfigService
  ) {}

  async getAll(langCode: string, options: IPaginationOptions) {
    const data = await paginate<Gallery>(this.galleryRepository, options, {
      where: {
        contents: {
          langCode,
        },
      },
      relations: {
        contents: true,
      },
    });

    const res = data.items.map((d) => {
      return { id: d.id, contents: d.contents[0] };
    });

    return { ...data, items: res };
  }

  async getForHomeSite() {
    const data = await this.galleryRepository.find({
      order: {
        createdAt: 'DESC',
      },
      take: 12,
    });
    const res = [];

    for (let i = 0; i < 12; i++) {
      if (res.length == 12) break;

      for (let j = 0; j < 12; j++) {
        if (data[j]?.images[i]) {
          res.push(data[j]?.images[i])
        }
      }
    }

    return res;
  }

  async getForSite(langCode: string, options: IPaginationOptions) {
    const data = await paginate<Gallery>(this.galleryRepository, options, {
      where: {
        contents: {
          langCode,
        },
      },
      relations: {
        contents: true,
      },
    });

    const res = data.items.map((d) => {
      const images = d.images.slice(0,4)
      return {
        id: d.id,
        title: d.contents[0]?.title,
        shortTitle: d.contents[0]?.shortTitle,
        images,
        imageCount: d?.images?.length,
      };
    });

    return { ...data, items: res };
  }

  async getOneForUpdate(id: string, langCode: string) {
    const data = await this.galleryRepository.findOne({
      where: {
        id,
        contents: {
          langCode,
        },
      },
      relations: {
        contents: true,
      },
    });

    return { ...data, contents: data.contents[0] };
  }

  async getOne(slug:string, langCode: string){
    const data = await this.galleryRepository.findOne({
      where: {
        slug,
        contents: {
          langCode,
        },
      },
      relations: {
        contents: true,
      },
    });

    return { ...data, contents: data.contents[0] };
  }

  async deleteOne(id: string) {
    const response = await this.galleryRepository.delete(id);
    return response;
  }

  async change(value: UpdateGalleryDto, id: string) {
    const gallery = await this.galleryRepository.findOne({
      where: { id },
    });

    if (value?.images) {
      gallery.images = value.images;
      await this.galleryRepository.save(gallery);
    }

    if (value.contents.length) {
      await this.galleryConSer.change(value.contents, gallery);
    }
  }

  async create(value: CreateGalleryDto) {
    const shortTitle = value.contents.find((c) => c.langCode == 'en')?.shortTitle;
    if (!shortTitle) {
      throw new HttpException('short title in english should be exist', 400);
    }

    const gallery = new Gallery();

    gallery.images = value?.images || [];
    gallery.slug = await this.makeSlug(shortTitle)
    gallery.url = await this.makeUrl('gallery/', shortTitle)
    await this.galleryRepository.save(gallery);

    await this.galleryConSer.create(value.contents, gallery);
    return gallery;
  }

  async makeUrl(path: string, title: string) {
    const url =
      this.configService.get('clientUrl') +
      path +
      slugify(title, { lower: true });

    const isExist = await this.galleryRepository.findOne({
      where: { url },
    });

    if (isExist) {
      return url + '_';
    }

    return url;
  }

  async makeSlug(title: string) {
    const slug = slugify(title, { lower: true });

    const isExist = await this.galleryRepository.findOne({
      where: { slug },
    });

    if (isExist) {
      return await this.makeSlug(slug + '_');
    }

    return slug;
  }
}
