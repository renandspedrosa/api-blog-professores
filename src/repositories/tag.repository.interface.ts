import { ITag } from '@/entities/models/tags.interface'

export interface ITagRepository {
  findAll(page: number, limit: number): Promise<ITag[]>
  findByName(name: string): Promise<ITag | null>
  create(tag: ITag): Promise<ITag>
  update(tag: ITag): Promise<ITag>
  delete(id: string): Promise<void>
}
