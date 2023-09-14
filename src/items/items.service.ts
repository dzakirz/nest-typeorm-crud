import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Comment } from './entities/comment.entity';
import { Item } from './entities/item.entity';
import { Listing } from './entities/listing.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const listing = new Listing({
      ...createItemDto.listing,
      rating: 0,
    });

    const tags = createItemDto.tags.map(
      (createTagDto) => new Tag(createTagDto),
    );

    const item = new Item({
      ...createItemDto,
      comments: [],
      tags: tags,
      listing: listing,
    });
    await this.entityManager.save(item);

    return item;
  }

  async findAll() {
    return this.itemsRepository.find();
  }

  async findOne(id: number) {
    return this.itemsRepository.findOne({
      where: { id: id },
      relations: {
        listing: true,
        tags: true,
        comments: true,
      },
    });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemsRepository.findOneBy({ id: id });
    item.public = updateItemDto.public;
    const comments = updateItemDto.comments.map(
      (createCommentDto) => new Comment(createCommentDto),
    );

    item.comments = comments;

    await this.entityManager.save(item);

    return item;
  }

  async remove(id: number) {
    await this.itemsRepository.delete(id);
  }
}
