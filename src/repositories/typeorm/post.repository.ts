import { IPostRepository } from '../post.repository.interface'
import { FindManyOptions, FindOptionsWhere, Like, Repository } from 'typeorm'
import { Post } from '@/entities/post.entity'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { IPost } from '@/entities/models/post.interface'

export class PostRepository implements IPostRepository {
  private repository: Repository<Post>

  constructor() {
    this.repository = appDataSource.getRepository(Post)
  }

  async create(postData: IPost): Promise<IPost | undefined> {
    const post = this.repository.create(postData)
    return this.repository.save(post)
  }

  async findAll(page: number, limit: number, tagId?: number): Promise<IPost[]> {
    const queryOptions: FindManyOptions<IPost> = {
      relations: ['tags'],
      skip: (page - 1) * limit,
      take: limit,
      order: {
        created_at: 'DESC',
      },
    }

    const whereConditions: FindOptionsWhere<IPost> = { status: 1 }

    if (tagId) {
      whereConditions.tags = { id: tagId }
    }

    queryOptions.where = whereConditions

    return this.repository.find(queryOptions)
  }

  async findPostById(id: string): Promise<IPost | undefined> {
    const post = await this.repository.findOne({
      relations: ['tags'],
      where: { id },
    })

    if (!post) throw new Error('Post not found')

    return post
  }

  async findPostByIdTeacher(
    teacherId: number,
    page: number,
    limit: number,
  ): Promise<IPost[]> {
    const offset = (page - 1) * limit

    return this.repository.find({
      relations: ['tags'],
      where: { teacher_id: teacherId, status: 1 },
      skip: offset,
      take: limit,
    })
  }

  async findPostByTextSearch(
    text: string,
    page: number,
    limit: number,
  ): Promise<IPost[]> {
    return this.repository.find({
      relations: ['tags'],
      where: [
        { content: Like(`%${text}%`), status: 1 },
        { title: Like(`%${text}%`), status: 1 },
      ],
      skip: (page - 1) * limit,
      take: limit,
    })
  }

  async updatePost(post: IPost): Promise<IPost> {
    post.updated_at = new Date()
    return this.repository.save(post)
  }

  async deletePost(id: string): Promise<void> {
    await this.repository.update(id, { status: 0 })
  }
}
