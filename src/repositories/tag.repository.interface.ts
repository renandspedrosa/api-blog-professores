import { ITag } from '@/entities/models/tags.interface'

export interface ITagRepository {
  findByName(name: string): Promise<ITag | null>
  create(tag: ITag): Promise<ITag>
  update(tag: ITag): Promise<ITag>
}
