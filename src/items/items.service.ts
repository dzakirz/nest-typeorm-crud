import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const item = new Item(createItemDto);
    await this.entityManager.save(item);

    return item;
  }

  async findAll() {
    return this.itemsRepository.find();
  }

  async findOne(id: number) {
    return this.itemsRepository.findOneBy({ id: id });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemsRepository.findOneBy({ id: id });
    item.public = updateItemDto.public;

    await this.entityManager.save(item);

    return item;
  }

  async remove(id: number) {
    await this.itemsRepository.delete(id);
  }
}
