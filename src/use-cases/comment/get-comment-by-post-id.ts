import { IComment } from '@/entities/models/comment.interface'
import { ICommentRepository } from '@/repositories/comment.repository.interface'

export class GetCommentByPostIdUseCase {
  constructor(private commentRepository: ICommentRepository) {}

  async handler(postId: string): Promise<IComment[] | null> {
    const comments = await this.commentRepository.getCommentsByPostId(postId)

    if (!comments) throw new Error('Comments not found!')

    return comments
  }
}
