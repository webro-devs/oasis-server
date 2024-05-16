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

  async getRightSide(destination:string,type: TransportType, langCode: string){
    const data = await this.transportRepository
    .findOne({
      relations: {
        page: {
          pagesOnRight: {
            contents: true,
          }
        },
      },
      where: {
        type,
        page: {
          contents: {
            langCode,
          },
        },
        destination:{
          slug: destination
        }
      },
      select: {
        id: true,
        page: {
          id: true,
          pagesOnRight: {
            id: true,
            slug: true,
            contents: {
              id: true,
              shortTitle: true,
              langCode: true,
            },
          },
        },
      },
    })
    .catch(() => {
      throw new NotFoundException('data not found');
    });

  if (!data) return [];

  const pagesOnRight = [];

  data.page.pagesOnRight.forEach((pr) => {
    const data = pr.contents.find((c) => c.langCode == langCode);
    if (!data) return;
    const { shortTitle } = data;
    pagesOnRight.push({
      slug: pr.slug,
      shortTitle,
    });
  });

    return pagesOnRight
  }

  async getLeftSide(destination:string,type: TransportType, langCode: string){
    const data = await this.transportRepository
    .findOne({
      relations: {
        page: {
          pagesOnLeft: {
            contents: true,
          }
        },
      },
      where: {
        type,
        page: {
          contents: {
            langCode,
          },
        },
        destination:{
          slug: destination
        }
      },
      select: {
        id: true,
        page: {
          id: true,
          pagesOnLeft: {
            id: true,
            slug: true,
            contents: {
              id: true,
              shortTitle: true,
              langCode: true,
            },
          },
        },
      },
    })
    .catch(() => {
      throw new NotFoundException('data not found');
    });

  if (!data) return [];

  const pagesOnLeft = [];

  data.page.pagesOnLeft.forEach((pr) => {
    const data = pr.contents.find((c) => c.langCode == langCode);
    if (!data) return;
    const { shortTitle } = data;
    pagesOnLeft.push({
      slug: pr.slug,
      shortTitle,
    });
  });

    return pagesOnLeft
  }

  async getContent(destination:string,type: TransportType, langCode: string){    
    const data = await this.transportRepository
    .findOne({
      relations: {
        page: {
          pagesOnLeft: {
            contents: true,
          },
          contents: {
            tags:true
          },
        },
        roadTransports:true
      },
      where: {
        type,
        page: {
          contents: {
            langCode,
          },
        },
        destination:{
          slug: destination
        }
      },
      select: {
        id: true,
        type: true,
        page: {
          id: true,
          contents: {
            id:true,
            title: true,
            descriptionPage: true,
          },
          pagesOnLeft: {
            id: true,
            slug: true,
            contents: {
              id: true,
              title: true,
              description: true,
              shortDescription:true,
              langCode: true,
            },
          },
        },
      },
    })
    .catch(() => {
      throw new NotFoundException('data not found');
    });

   if(!data) return {}

  const content = [];

  data.page?.pagesOnLeft?.forEach((pr) => {
    const data = pr.contents.find((c) => c.langCode == langCode);
    if (!data) return;
    const { title, description,shortDescription } = data;
    content.push({
      slug: pr.slug,
      title,
      description,
      shortDescription
    });
  });

    const page:any = data.page.contents[0]
    delete page.id

    if(data?.roadTransports?.length){
      const transport = []
      data?.roadTransports?.forEach(r=>{
        transport.push({
          bag: r?.bag || '',
          photo: r?.photo || '',
          seat: r?.seat || '',
          name: r?.type?.find(t=> t.langCode == langCode)?.type || ''
        })
      })
      page.roadTransport = transport
    }

    return {...page,content};
  }

  async getOneByType(destination:string,type: TransportType) {
    const data = await this.transportRepository.findOne({
      where: {
        type,
        destination:{
          id:destination
        }
      },
    }) 
    
    return data;
  }

  async getForAdmin(langCode:string,type: TransportType) {
    const data = await this.transportRepository.find({
      where: {
        page: {
          contents: {
            langCode,
          },
        },
        type
      },
      relations: {
        page: {
          pagesOnLeft: {
            contents: true,
          },
          pagesOnRight: {
            contents: true,
          },
          contents: true,
        },
        destination:true
      },
      select: {
        id: true,
        type: true,
        page: {
          id: true,
          contents: {
            title: true,
          },
          pagesOnLeft: {
            slug: true,
            contents: {
              langCode: true,
              shortTitle: true,
            },
          },
          pagesOnRight: {
            slug: true,
            contents: {
              langCode: true,
              shortTitle: true,
            },
          },
        },
        destination: {
          id:true,
          slug:true
        }
      },
    });

    const res = []

    data.forEach((d) => {
      const pagesOnLeft = [], pagesOnRight = []
      d.page.pagesOnLeft.forEach((pl) => {
        const data = pl.contents.find((c) => c.langCode == langCode);
        pagesOnLeft.push({
          title: data?.shortTitle,
          slug: pl?.slug
        })
      });
      d.page.pagesOnRight.forEach((pl) => {
        const data = pl.contents.find((c) => c.langCode == langCode);
        pagesOnRight.push({
          title: data?.shortTitle,
          slug: pl?.slug
        })
      });
      res.push({
        id:d.id,
        slug: d?.destination?.slug,
        type: d.type,
        pageId: d.page.id,
        title: d.page.contents[0].title,
        url: d.page.url,
        pagesOnLeft,
        pagesOnRight,
        views: d.views
      })
    });


    return res;
  }

  async getMenu(destination:string,type:TransportType,langCode:string, menu:string){
    if(menu == 'left'){
      return await this.getLeftMenu(destination,type, langCode)
    }else if(menu == 'right'){
      return await this.getRightMenu(destination,type, langCode)
    }
  }

  async getLeftMenu(destination:string,type:TransportType, langCode:string){
    const data = await this.transportRepository.findOne({
      where:{
        type,
        destination:{
          slug: destination
        }
      },
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

    if(!data) return []

    const ids = data?.page?.pagesOnLeft?.map(p=> p.id)

    if(!ids?.length) return []

    return await this.pageService.getMoreByIds(ids,langCode)
  }

  async getRightMenu(destination:string,type:TransportType, langCode:string){
    const data = await this.transportRepository.findOne({
      where:{
        type,
        destination:{
          slug: destination
        }
      },
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

    if(!data) return []

    const ids = data?.page?.pagesOnRight?.map(p=> p.id)

    if(!ids?.length) return []

    return await this.pageService.getMoreByIds(ids,langCode)
  }

  async getOneForUpdate(destination:string,type:TransportType, langCode:string){
    const data = await this.transportRepository.findOne({
      where:{
        type,
        page:{
          contents:{
            langCode
          }
        },
        destination:{
          slug: destination
        }
      },
      relations:{
        page:{
          contents:{
            tags:true
          }
        },
        roadTransports:true,
        destination:true
      }
    })

    if(type == 'transfer'){
      return {...data?.page?.contents[0],roadTransports: data?.roadTransports,destinationId: data?.destination?.id}
    }

    return {...data?.page?.contents[0], destinationId: data?.destination?.id}
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

    if(value?.descImages){
      transport.descImages = value?.descImages ? value.descImages : transport.descImages
      this.transportRepository.save(transport)
    }

    if (value?.contents?.length) {
      await this.pageService.change(value, transport.page.id);
    }

    if (value?.roadTransports?.length) {
      await this.roadTransService.change(value.roadTransports, transport.id);
    }
  }

  async create(value: CreateTransportDto) {
    const isExist = await this.getOneByType(value.destination,value.type);

    if (isExist) {
      return new HttpException(`${value.type} already exist in this destination`, 400);
    }

    const transport = await this.createTransport({
      type: value.type,
      descImages: value.descImages,
      destination: value.destination
    })

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

  async createTransport(value) {
    const data = await this.transportRepository
      .createQueryBuilder()
      .insert()
      .into(Transport)
      .values( value as unknown as Transport)
      .returning('id')
      .execute();

    return await this.transportRepository.findOne({ where: { id: data.raw[0].id } });
  }

  async deleteRoadTransport(id:string){
    this.roadTransService.deleteOne(id)
  }
}
