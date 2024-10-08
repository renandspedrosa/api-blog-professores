import { IComment } from '@/entities/models/comment.interface'
import { ICommentRepository } from '@/repositories/comment.repository.interface'

export class GetAllCommentsUseCase {
  constructor(private commentRepository: ICommentRepository) {}

  async handler(page: number, limit: number): Promise<IComment[]> {
    const allComments = await this.commentRepository.getAllComments(page, limit)

    if (!allComments) throw new Error('There are no comments')

    return allComments
  }
}
