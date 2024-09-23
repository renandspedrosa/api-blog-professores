import { ISubject } from '@/entities/models/subject.interface'
import { ITag } from '@/entities/models/tags.interface'

export interface ITagRepository {
  create(name: string, subject?: ISubject[]): Promise<void>

  update(tag: ITag): Promise<ITag>
}
