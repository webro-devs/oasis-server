import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateRoadTransportDto, CreateRoadTransportDto } from './dto';
import { RoadTransport } from './road-transport.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoadTransportService {
  constructor(
    @InjectRepository(RoadTransport)
    private readonly roadTransRepository: Repository<RoadTransport>,
  ) {}

  async deleteOne(id: string) {
    const response = await this.roadTransRepository.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(values: UpdateRoadTransportDto[], transport: string) {
    const newContents = values.filter((pc) => !pc.id);
    const olderContents = values.filter((pc) => pc.id);

    await Promise.all(
      olderContents.map(async (value) => {
        await this.roadTransRepository.update({ id: value.id }, { ...value });
      }),
    );

    newContents.length ? await this.create(newContents,transport) : null;
  }

  async create(values: CreateRoadTransportDto[],transport:string) {
    await Promise.all(
      values.map(async (value) => {
          await this.roadTransRepository
        .createQueryBuilder()
        .insert()
        .into(RoadTransport)
        .values({...value,transport} as unknown as RoadTransport)
        .execute()
      }),
    );
  }
}
