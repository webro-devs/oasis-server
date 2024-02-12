import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UpdateDestinationDto, CreateDestinationDto } from './dto';
import { Destination } from './destination.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PageService } from '../page/page.service';
import slugify from 'slugify';

@Injectable()
export class DestinationService {
  constructor(
    @InjectRepository(Destination)
    private readonly destinationRepository: Repository<Destination>,
    private readonly pageService: PageService,
  ) {}

  async getAll(langCode: string) {
    const data = await this.destinationRepository.find({
      where: {
        page: {
          contents: {
            langCode,
          },
        },
      },
      order: {
        index: 'ASC',
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
      },
      select: {
        slug: true,
        index: true,
        id: true,
        views: true,
        page: {
          id: true,
          url: true,
          contents: {
            title: true,
          },
          pagesOnLeft: {
            slug: true,
            index: true,
            contents: {
              langCode: true,
              shortTitle: true,
            },
          },
          pagesOnRight: {
            slug: true,
            index: true,
            contents: {
              langCode: true,
              shortTitle: true,
            },
          },
        },
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
        slug: d.slug,
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

  async getAllForSite(langCode: string) {
    const data = await this.destinationRepository.find({
      where: {
        page: {
          contents: {
            langCode,
          },
        },
      },
      order: {
        index: 'ASC',
      },
      relations: {
        page: {
          contents: true,
        },
      },
      select: {
        id: true,
        slug: true,
        page: {
          id: true,
          contents: {
            shortTitle: true,
          },
        },
      },
    });

    const res = [];
    data.forEach((d) => {
      res.push({
        slug: d.slug,
        shortTitle: d.page.contents[0].shortTitle,
        title: d.slug,
      });
    });
    return res;
  }

  async getMenu(id: string, langCode: string, menu: string) {
    if (menu == 'left') {
      return await this.getLeftMenu(id, langCode);
    } else if (menu == 'right') {
      return await this.getRightMenu(id, langCode);
    }
  }

  async getLeftMenu(id: string, langCode: string) {
    const data = await this.destinationRepository.findOne({
      where: { id },
      relations: {
        page: {
          pagesOnLeft: true,
        },
      },
      select: {
        id: true,
        page: {
          id: true,
          pagesOnLeft: {
            id: true,
          },
        },
      },
    });

    if (!data) return [];

    const ids = data?.page?.pagesOnLeft?.map((p) => p.id);

    if (!ids?.length) return [];

    return await this.pageService.getMoreByIds(ids, langCode);
  }

  async getRightMenu(id: string, langCode: string) {
    const data = await this.destinationRepository.findOne({
      where: { id },
      relations: {
        page: {
          pagesOnRight: true,
        },
      },
      select: {
        id: true,
        page: {
          id: true,
          pagesOnRight: {
            id: true,
          },
        },
      },
    });

    if (!data) return [];

    const ids = data?.page?.pagesOnRight?.map((p) => p.id);

    if (!ids?.length) return [];

    return await this.pageService.getMoreByIds(ids, langCode);
  }

  async getOneForUpdate(id: string, langCode: string) {
    const data = await this.destinationRepository.findOne({
      where: {
        id,
        page: {
          contents: {
            langCode,
          },
        },
      },
      relations: {
        page: {
          contents: {
            tags: true,
          },
        },
      },
    });

    return data.page.contents[0];
  }

  async getRightSide(slug: string, langCode: string) {
    const data = await this.destinationRepository
      .findOne({
        relations: {
          page: {
            pagesOnRight: {
              contents: true,
            },
          },
        },
        where: {
          slug,
          page: {
            contents: {
              langCode,
            },
          },
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

    return pagesOnRight;
  }

  async getLeftSide(slug: string, langCode: string) {
    const data = await this.destinationRepository
      .findOne({
        relations: {
          page: {
            pagesOnLeft: {
              contents: true,
            },
          },
        },
        where: {
          slug,
          page: {
            contents: {
              langCode,
            },
          },
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

    return pagesOnLeft;
  }

  async getContent(slug: string, langCode: string) {
    const data = await this.destinationRepository
      .findOne({
        relations: {
          page: {
            pagesOnLeft: {
              contents: true,
            },
            contents: {
              tags: true,
            },
          },
        },
        where: {
          slug,
          page: {
            contents: {
              langCode,
            },
          },
        },
        select: {
          id: true,
          slug: true,
          photo:true,
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
      const { title, description } = data;
      content.push({
        slug: pr.slug,
        title,
        description,
      });
    });

    const page:any = data.page.contents[0];
    page.photo = data.photo
    delete page.id

    return { ...page, content };
  }

  async deleteOne(id: string) {
    const response = await this.destinationRepository.delete(id).catch(() => {
      throw new NotFoundException('data not found');
    });
    return response;
  }

  async change(value: UpdateDestinationDto, id: string) {
    const destination = await this.destinationRepository.findOne({
      where: { id },
      relations: {
        page: true,
      },
    });

    await this.pageService.change(value, destination.page.id);
  }

  async create(value: CreateDestinationDto) {
    const title = value.contents.find((c) => c.langCode == 'en')?.title;
    if (!title) {
      throw new HttpException('title in english should be exist', 400);
    }

    const destination = new Destination();
    destination.slug = await this.makeSlug(title);
    destination.photo
    await this.destinationRepository.save(destination);

    await this.pageService.create(
      value,
      { destination, isTopic: false },
      { path: 'destination/', short: true },
    );
    return destination;
  }

  async makeSlug(title: string) {
    const slug = slugify(title, { lower: true });

    const isExist = await this.destinationRepository.findOne({
      where: { slug },
    });

    if (isExist) {
      return await this.makeSlug(slug + '_');
    }

    return slug;
  }
}
