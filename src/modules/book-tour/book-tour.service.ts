import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateBookTourDto, CreateBookTourDto } from './dto';
import { BookTour } from './book-tour.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookTourService {
  constructor(
    @InjectRepository(BookTour)
    private readonly bookTourRepository: Repository<BookTour>,
  ) {}

  async getAll() {
    const data = await this.bookTourRepository.find();
    return data;
  }

  async getOne(id: string) {
    const data = await this.bookTourRepository.findOne({
      where: { id },
    });

    if (!data) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async deleteOne(id: string) {
    const response = await this.bookTourRepository.delete(id);
    return response;
  }

  async change(value: UpdateBookTourDto, id: string) {
    const response = await this.bookTourRepository.update({ id }, value);
    return response;
  }

  async create(value: CreateBookTourDto) {
    const data = this.bookTourRepository.create(value);
    const res = await this.bookTourRepository.save(data);
    return res
  }
}
