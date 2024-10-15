import { Tag } from '@/entities/tag.entity'
import { Post } from '@/entities/post.entity'

describe('Entity Tag', () => {
  it('It should create a new tag object and define its values', async () => {
    const newTag = new Tag()
    newTag.id = 1
    newTag.name = `Test Tag ${Date.now()}`
    newTag.created_at = new Date()
    newTag.updated_at = new Date()
    newTag.status = 1

    expect(newTag).toBeInstanceOf(Tag)
    expect(newTag.id).toBe(1)
    expect(newTag.name).toBe(newTag.name)
    expect(newTag.created_at).toBeInstanceOf(Date)
    expect(newTag.updated_at).toBeInstanceOf(Date)
    expect(newTag.status).toBe(1)
    expect(newTag.posts).toBeUndefined()
  })

  it('It should associate posts with the tag', async () => {
    const newTag = new Tag()
    newTag.id = 2
    newTag.name = 'Another Tag'
    newTag.status = 1

    const post1 = new Post()
    post1.id = '4e106c23-98cd-456a-955d-adc35295d5d4'
    post1.title = 'Post 1'

    const post2 = new Post()
    post2.id = '591d008b-95e1-47a0-a1e8-33a84b8a02f2'
    post2.title = 'Post 2'

    newTag.posts = [post1, post2]

    expect(newTag.posts).toHaveLength(2)
    expect(newTag.posts).toContainEqual(post1)
    expect(newTag.posts).toContainEqual(post2)
  })
})
