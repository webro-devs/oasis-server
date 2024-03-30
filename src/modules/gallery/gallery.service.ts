import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateGalleryDto, CreateGalleryDto } from './dto';
import { Gallery } from './gallery.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private readonly galleryRepository: Repository<Gallery>,
  ) {}

  async getAll() {
    const data = await this.galleryRepository.find();
    return data;
  }

  async getOne(id: string) {
    const data = await this.galleryRepository.findOne({
      where: { id },
    });

    if (!data) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async deleteOne(id: string) {
    const response = await this.galleryRepository.delete(id);
    return response;
  }

  async change(value: UpdateGalleryDto, id: string) {
    const response = await this.galleryRepository.update({ id }, value);
    return response;
  }

  async create(value: CreateGalleryDto) {
    const data = this.galleryRepository.create(value);
    const res = await this.galleryRepository.save(data);
    return res
  }
}
