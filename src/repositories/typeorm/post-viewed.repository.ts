import { appDataSource } from '@/lib/typeorm/typeorm'
import { Repository } from 'typeorm'
import { IPostViewedRepository } from '../post-viewed.repository.interface'
import { PostViewed } from '@/entities/post-viewed.entity'
import { IPostViewed } from '@/entities/models/post-viewed.interface'

export class PostViewedRepository implements IPostViewedRepository {
  private repository: Repository<PostViewed>

  constructor() {
    this.repository = appDataSource.getRepository(PostViewed)
  }

  async create(postViewedData: IPostViewed): Promise<IPostViewed> {
    const postViewed = this.repository.create(postViewedData)
    return this.repository.save(postViewed)
  }

  async postViewedExists(
    post_id: string,
    student_id: number,
  ): Promise<boolean> {
    const postViewed = await this.repository.findOne({
      where: {
        post_id,
        student_id,
      },
    })

    return !!postViewed
  }
}
