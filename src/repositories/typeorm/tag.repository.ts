import { Tag } from '@/entities/tag.entity'
import { ITagRepository } from '../tag.repository.interface'
import { Repository } from 'typeorm'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { ITag } from '@/entities/models/tags.interface'

export class TagRepository implements ITagRepository {
  private repository: Repository<Tag>

  constructor() {
    this.repository = appDataSource.getRepository(Tag)
  }

  async create(name: string): Promise<void> {
    await this.repository.save({ name })
  }

  async update(tag: ITag): Promise<ITag> {
    const updatedTag = {
      ...tag,
      updated_at: new Date(),
    }
    return this.repository.save(updatedTag)
  }

  async findByName(name: string): Promise<ITag | null> {
    return this.repository.findOne({ where: { name } })
  }
}
