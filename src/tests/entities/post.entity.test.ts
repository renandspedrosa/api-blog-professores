import { Post } from '@/entities/post.entity'
import { Tag } from '@/entities/tag.entity'
import { Teacher } from '@/entities/teacher.entity'

describe('Entity Post', () => {
  it('should create a new post object and define its values', async () => {
    const newPost = new Post()
    newPost.id = '7e5eaf1c-2b9c-4efb-9f80-1c10e99e76f5'
    newPost.title = 'Test Post'
    newPost.content = 'This is a test content for the post.'
    newPost.status = 1
    newPost.created_at = new Date()
    newPost.updated_at = new Date()
    newPost.teacher_id = 1
    newPost.teacher = new Teacher()
    newPost.tags = [new Tag()]

    expect(newPost).toBeInstanceOf(Post)
    expect(newPost.id).toBe('7e5eaf1c-2b9c-4efb-9f80-1c10e99e76f5')
    expect(newPost.title).toBe('Test Post')
    expect(newPost.content).toBe('This is a test content for the post.')
    expect(newPost.status).toBe(1)
    expect(newPost.created_at).toBeInstanceOf(Date)
    expect(newPost.updated_at).toBeInstanceOf(Date)
    expect(newPost.teacher_id).toBe(1)
    expect(newPost.teacher).toBeInstanceOf(Teacher)
    expect(newPost.tags?.[0]).toBeInstanceOf(Tag)
  })
})
