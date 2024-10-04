import { IComment } from '@/entities/models/comment.interface'
import { ICommentRepository } from '@/repositories/comment.repository.interface'

export class CreateCommentUseCase {
  constructor(private commentRepository: ICommentRepository) {}

  async handler(comment: IComment): Promise<void> {
    return this.commentRepository.create(comment)
  }
}
