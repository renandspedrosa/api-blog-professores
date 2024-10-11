import { ITag } from '@/entities/models/tags.interface'

export interface ITagRepository {
  create(tag: ITag): Promise<ITag>
  update(tag: ITag): Promise<ITag>
}
