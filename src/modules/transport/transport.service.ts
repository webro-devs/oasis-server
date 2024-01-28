import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateTransportDto, CreateTransportDto } from './dto';
import { Transport } from './transport.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PageService } from '../page/page.service';
import { RoadTransportService } from '../road-transport/road-transport.service';
import { TransportType } from 'src/infra/shared/type';

@Injectable()
export class TransportService {
  constructor(
    @InjectRepository(Transport)
    private readonly transportRepository: Repository<Transport>,
    private readonly pageService: PageService,
    private readonly roadTransService: RoadTransportService,
  ) {}

  async getOne(type: TransportType, langCode: string) {
    const data = await this.transportRepository
      .findOne({
        where: {
          type,
          page: {
            contents: {
              langCode,
            },
          },
        },
        relations: {
          page: {
            pagesOnLeft: {
              contents:true
            },
            pagesOnRight: {
              contents:true
            },
            contents: {
              tags:true
            },
          },
          roadTransports: true,
        }
      })
      .catch(() => {
        throw new NotFoundException('data not found');
      });

      if(!data) return {}

      const pagesOnLeft = []
      const pagesOnRight = []

      data.page.pagesOnLeft.forEach(pr=>{
        pr.contents = pr.contents.filter(c=>c.langCode == langCode)
        pagesOnLeft.push({
          slug:pr.slug,
          title:pr.contents[0]?.title,
          shortTitle: pr.contents[0]?.shortTitle,
          description: pr.contents[0]?.description
        })
      }) 
  
      data.page.pagesOnRight.forEach(pr=>{
        pr.contents = pr.contents.filter(c=>c.langCode == langCode)
        pagesOnRight.push({
          slug:pr.slug,
          shortTitle: pr.contents[0]?.shortTitle,
        })
      })

      const page = {...data.page,contents: data.page.contents[0]}
      delete data.page.pagesOnLeft
      delete data.page.pagesOnRight

      return {...data,page,pagesOnLeft,pagesOnRight};
  }

  async getOneByType(type: TransportType) {
    const data = await this.transportRepository.findOne({
      where: {
        type,
      },
    }) 
    
    return data;
  }

  async getMenu(type:TransportType,langCode:string, menu:string){
    if(menu == 'left'){
      return await this.getLeftMenu(type, langCode)
    }else if(menu == 'right'){
      return await this.getRightMenu(type, langCode)
    }
  }

  async getLeftMenu(type:TransportType, langCode:string){
    const data = await this.transportRepository.findOne({
      where:{type},
      relations:{
        page:{
          pagesOnLeft:true
        }
      },
      select:{
        id:true,
        page:{
          id:true,
          pagesOnLeft:{
            id:true
          }
        }
      }
    })

    if(!data) return {}

    const ids = data?.page?.pagesOnLeft?.map(p=> p.id)

    if(!ids?.length) return {}

    return await this.pageService.getMoreByIds(ids,langCode)
  }

  async getRightMenu(type:TransportType, langCode:string){
    const data = await this.transportRepository.findOne({
      where:{type},
      relations:{
        page:{
          pagesOnRight:true
        }
      },
      select:{
        id:true,
        page:{
          id:true,
          pagesOnRight:{
            id:true
          }
        }
      }
    })

    if(!data) return {}

    const ids = data?.page?.pagesOnRight?.map(p=> p.id)

    if(!ids?.length) return {}

    return await this.pageService.getMoreByIds(ids,langCode)
  }

  async getOneForUpdate(type:TransportType, langCode:string){
    const data = await this.transportRepository.findOne({
      where:{
        type,
        page:{
          contents:{
            langCode
          }
        }
      },
      relations:{
        page:{
          contents:{
            tags:true
          }
        }
      }
    })

    return data.page.contents[0]
  }

  async deleteOne(id: string) {
    const response = await this.transportRepository.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(value: UpdateTransportDto, id: string) {
    const transport = await this.transportRepository.findOne({
      where: { id },
      relations: {
        page: true,
      },
    });

    if (value?.contents?.length) {
      await this.pageService.change(value, transport.page.id);
    }

    if (value?.roadTransports?.length) {
      await this.roadTransService.change(value.roadTransports, transport.id);
    }
  }

  async create(value: CreateTransportDto) {
    const isExist = await this.getOneByType(value.type);

    if (isExist) {
      return new HttpException(`${value.type} already exist`, 400);
    }

    const transport = new Transport();
    transport.type = value.type;
    await this.transportRepository.save(transport);

    if (value?.roadTransports?.length) {
      await this.roadTransService.create(value.roadTransports, transport.id);
      delete value.roadTransports;
    }

    await this.pageService.create(
      value,
      { transport, isTopic: false },
      { path: `${value.type}`, short: false },
    );
    return transport;
  }
}
