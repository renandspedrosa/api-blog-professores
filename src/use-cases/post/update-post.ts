import { IPost } from '@/entities/models/post.interface'
import { ITag } from '@/entities/models/tags.interface'
import { IPostRepository } from '@/repositories/post.repository.interface'
import { ITagRepository } from '@/repositories/tag.repository.interface'

export class UpdatePostUseCase {
  constructor(
    private postRepository: IPostRepository,
    private tagRepository: ITagRepository,
  ) {}

  async handler(post: Partial<IPost>): Promise<IPost | undefined> {
    if (!post.id) {
      throw new Error('Post ID is required')
    }
    const existingPost = await this.postRepository.findPostById(post.id)
    if (!existingPost) {
      throw new Error('Post not found')
    }

    existingPost.title = post.title ?? existingPost.title
    existingPost.content = post.content ?? existingPost.content

    if (post.tags) {
      const tags = await this.handleTags(post.tags)
      existingPost.tags = tags
    }

    return this.postRepository.updatePost(existingPost as IPost)
  }

  private async handleTags(tagData: ITag[]): Promise<ITag[]> {
    const tags: ITag[] = []

    for (const tag of tagData) {
      const existingTag = await this.tagRepository.findByName(tag.name)
      if (!existingTag) {
        await this.tagRepository.create(tag.name)
      }
      tags.push(tag)
    }

    return tags
  }
}
