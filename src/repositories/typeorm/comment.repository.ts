import { Repository } from 'typeorm'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { IComment } from '@/entities/models/comment.interface'
import { Comment } from '@/entities/comment.entity'
import { ICommentRepository } from '@/repositories/comment.repository.interface'

export class CommentRepository implements ICommentRepository {
  private repository: Repository<Comment>

  constructor() {
    this.repository = appDataSource.getRepository(Comment)
  }

  async create(commentData: IComment): Promise<IComment | undefined> {
    const newComment = this.repository.create(commentData)
    return this.repository.save(newComment)
  }

  async update(comment: IComment): Promise<IComment> {
    const updatedComment = {
      ...comment,
      updated_at: new Date(),
    }
    return this.repository.save(updatedComment)
  }

  async delete(commentId: string): Promise<void> {
    await this.repository.update(commentId, { status: 0 })
  }
}
