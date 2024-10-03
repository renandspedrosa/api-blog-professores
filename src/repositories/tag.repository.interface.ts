import { ITag } from '@/entities/models/tags.interface'

export interface ITagRepository {
  create(name: string): Promise<void>

  update(tag: ITag): Promise<ITag>
}
