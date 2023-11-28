import {
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';

import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';
import { hashPassword } from 'src/infra/helpers';

Injectable();
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAll() {
    return await this.userRepository.find();
  }

  async getByLogin(login: string) {
    const data = await this.userRepository.findOne({
      where: { login },
    });

    return data;
  }

  async getOne(id: string) {
    const data = await this.userRepository
      .findOne({
        where: { id },
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

    return data;
  }

  async deleteOne(id: string) {
    const response = await this.userRepository.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(value: UpdateUserDto, id: string) {
    const response = await this.userRepository
      .createQueryBuilder()
      .update()
      .set(value as unknown as User)
      .where('id = :id', { id })
      .execute();
    return response;
  }

  async create(data: CreateUserDto) {
    const password = await hashPassword(data.password);
    const user = this.userRepository.create({
      ...data,
      password,
    });
    return await this.userRepository.save(user);
  }
}
