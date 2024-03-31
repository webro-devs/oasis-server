import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateGalleryDto, CreateGalleryDto } from './dto';
import { Gallery } from './gallery.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GalleryContentService } from '../gallery-content/gallery-content.service';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private readonly galleryRepository: Repository<Gallery>,
    private readonly galleryConSer: GalleryContentService
  ) {}

  async getAll(langCode:string,options: IPaginationOptions) {
    const data = await paginate<Gallery>(this.galleryRepository, options, {
     where:{
      contents:{
        langCode
      }
     },
     relations:{
      contents:true
     }
    })

    const res = data.items.map(d=>{
      return {images:d.images, ...d.contents[0]}
    })

    return {...data,items:res}
  }

  async getOneForUpdate(id:string,langCode:string){
    const data = await this.galleryRepository.findOne({
      where:{
        id,
        contents:{
          langCode
        }
      },
      relations:{
        contents:true
      }
    })

    return {...data.contents[0],images: data.images}
  }

  async deleteOne(id: string) {
    const response = await this.galleryRepository.delete(id);
    return response;
  }

  async change(value: UpdateGalleryDto, id: string) {
    const gallery = await this.galleryRepository.findOne({
      where: { id },
    });

    if(value?.images){
      gallery.images = value.images
      await this.galleryRepository.save(gallery)
    }

    if(value.contents.length){
      await this.galleryConSer.change(value.contents, gallery);
    }
  }

  async create(value: CreateGalleryDto) {
    const gallery = new Gallery();

    gallery.images = value?.images || []
    await this.galleryRepository.save(gallery);

    await this.galleryConSer.create(value.contents, gallery);
    return gallery;
  }
}
