import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdatePartnerDto, CreatePartnerDto } from './dto';
import { Partner } from './partner.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(Partner)
    private readonly partnerRepository: Repository<Partner>,
  ) {}

  async getAll() {
    const data = await this.partnerRepository.find();
    return data;
  }

  async getOne(id: string) {
    const data = await this.partnerRepository.findOne({
      where: { id },
    });

    if (!data) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async deleteOne(id: string) {
    const response = await this.partnerRepository.delete(id);
    return response;
  }

  async change(value: UpdatePartnerDto, id: string) {
    const response = await this.partnerRepository.update({ id }, value);
    return response;
  }

  async create(value: CreatePartnerDto) {
    const data = this.partnerRepository.create(value);
    const res = await this.partnerRepository.save(data);
    return res
  }
}
