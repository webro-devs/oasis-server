import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import {
  UpdateContactDto,
  CreateContactList,
  CreateContactDto,
  UpdateContactList,
} from './dto';
import { Contact } from './contact.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async getAll() {
    const data = await this.contactRepository.find();
    return data;
  }

  async getOne(langCode: string) {
    const data = await this.contactRepository.findOne({
      where: { langCode },
    });

    if (!data) {
      throw new HttpException('data not found', HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async getByLangCode(langCode: string) {
    const data = await this.contactRepository.findOne({ where: { langCode } });
    return data;
  }

  async deleteOne(id: string) {
    const response = await this.contactRepository.delete(id);
    return response;
  }

  async change(value: UpdateContactList) {
    const updatedData = value.contents.filter((c) => c.id);

    const createdData = value.contents.filter((c) => !c.id);

    await Promise.all(
      updatedData.map(async (v) => {
        await this.contactRepository.update({ id: v.id }, v);
      }),
    );

    await Promise.all(
      createdData.map(async (v) => {
        await this.create(v);
      }),
    );
  }

  async createMore(value: CreateContactList) {
    await Promise.all(
      value.contents.map(async (v) => {
        await this.create(v);
      }),
    );
  }

  async create(value: CreateContactDto) {
    const contact = await this.getByLangCode(value.langCode);
    if (contact) {
      return 
    }
    const data = this.contactRepository.create(value);
    await this.contactRepository.save(data);
  }
}
