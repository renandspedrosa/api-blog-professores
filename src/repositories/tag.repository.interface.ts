import { ITag } from '@/entities/models/tags.interface'

export interface ITagRepository {
  create(name: string): Promise<void>
  findByName(name: string): Promise<ITag | null>
  update(tag: ITag): Promise<ITag>
}
