import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateGalleryContentDto, UpdateGalleryContentDto } from './dto';
import { GalleryContent } from './gallery-content.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Gallery } from '../gallery/gallery.entity';

@Injectable()
export class GalleryContentService {
  constructor(
    @InjectRepository(GalleryContent)
    private readonly galleryConRepo: Repository<GalleryContent>,
  ) {}

  async getById(id:string){
    return await this.galleryConRepo.findOne({
      where:{id},
    })
  }

  async deleteOne(id: string) {
    const response = await this.galleryConRepo.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(values:UpdateGalleryContentDto[], gallery: Gallery) {
    const newContents = values.filter((dc) => !dc.id);
    const olderContents = values.filter((dc) => dc.id);

    await Promise.all(
      olderContents.map(async (value) => {
        await this.updateContent(value.id, value)
      }),
    );

    newContents.length ? await this.create(newContents, gallery) : null;
  }

  async updateContent(id:string,value: UpdateGalleryContentDto){
     let data = await this.galleryConRepo.findOne({
      where:{id},
    })
    await this.galleryConRepo.save({...data,...value})
  }

  async create(values: CreateGalleryContentDto[], attraction: Gallery) {
    await Promise.all(
      values.map(async (value) => {
       await this.createContent(value,attraction)
      }),
    );
  }

  async createContent(value: CreateGalleryContentDto, gallery: Gallery) {
    const data = this.galleryConRepo.create({ ...value, gallery });
    await this.galleryConRepo.save(data);
  }
}
