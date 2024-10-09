import { IComment } from '@/entities/models/comment.interface'
import { ICommentRepository } from '@/repositories/comment.repository.interface'

export class UpdateCommentUseCase {
  constructor(private commentRepository: ICommentRepository) {}

  async handler(comment: IComment): Promise<IComment> {
    return this.commentRepository.update(comment)
  }
}
