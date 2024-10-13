import { IComment } from '@/entities/models/comment.interface'

export interface ICommentRepository {
  create(comment: IComment): Promise<IComment | undefined>
  getAllComments(page: number, limit: number): Promise<IComment[]>
  getById(id: string): Promise<IComment | null>
  getCommentsByPostId(
    post_id: string,
    page: number,
    limit: number,
  ): Promise<IComment[]>
  update(comment: IComment): Promise<IComment>
  delete(id: string): Promise<void>
}
