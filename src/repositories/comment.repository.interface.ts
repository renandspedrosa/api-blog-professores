import { IComment } from '@/entities/models/comment.interface'

export interface ICommentRepository {
  create(comment: IComment): Promise<IComment | undefined>
  update(comment: IComment): Promise<IComment>
  delete(id: string): Promise<void>
}
