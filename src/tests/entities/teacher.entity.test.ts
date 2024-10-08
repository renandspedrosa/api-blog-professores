import { Post } from '@/entities/post.entity'
import { Teacher } from '@/entities/teacher.entity'
import { User } from '@/entities/user.entity'
import { Subject } from '@/entities/subject.entity'

describe('Entity Teacher', () => {
  it('It should create a new teacher object and define its values', async () => {
    const newTeacher = new Teacher()
    newTeacher.id = 1
    newTeacher.user_id = 10
    newTeacher.status = 1
    newTeacher.created_at = new Date()
    newTeacher.updated_at = new Date()

    expect(newTeacher).toBeInstanceOf(Teacher)
    expect(newTeacher.id).toBe(1)
    expect(newTeacher.user_id).toBe(10)
    expect(newTeacher.status).toBe(1)
    expect(newTeacher.created_at).toBeInstanceOf(Date)
    expect(newTeacher.updated_at).toBeInstanceOf(Date)
    expect(newTeacher.user).toBeUndefined()
    expect(newTeacher.posts).toBeUndefined()
    expect(newTeacher.subjects).toBeUndefined()
  })

  it('It should associate a user with the teacher', async () => {
    const newTeacher = new Teacher()
    newTeacher.id = 2

    const user = new User()
    user.id = 1
    user.email = 'test@example.com'
    user.password = 'secret'
    user.name = 'Test User'

    newTeacher.user = user

    expect(newTeacher.user).toBeInstanceOf(User)
    expect(newTeacher.user.id).toBe(1)
    expect(newTeacher.user.email).toBe('test@example.com')
    expect(newTeacher.user.name).toBe('Test User')
  })

  it('It should associate posts with the teacher', async () => {
    const newTeacher = new Teacher()
    newTeacher.id = 3

    const post1 = new Post()
    post1.id = '4e106c23-98cd-456a-955d-adc35295d5d4'
    post1.title = 'Post 1'
    post1.content = 'Content of post 1'
    post1.teacher = newTeacher

    const post2 = new Post()
    post2.id = '591d008b-95e1-47a0-a1e8-33a84b8a02f2'
    post2.title = 'Post 2'
    post2.content = 'Content of post 2'
    post2.teacher = newTeacher

    newTeacher.posts = [post1, post2]

    expect(newTeacher.posts).toHaveLength(2)
    expect(newTeacher.posts).toContainEqual(post1)
    expect(newTeacher.posts).toContainEqual(post2)
    expect(post1.teacher).toBe(newTeacher)
    expect(post2.teacher).toBe(newTeacher)
  })

  it('It should associate subjects with the teacher', async () => {
    const newTeacher = new Teacher()
    newTeacher.id = 4

    const subject1 = new Subject()
    subject1.id = 'd2a4b0d6-9f21-4e0b-8d6c-6a5043a788a5'
    subject1.name = 'Math'

    const subject2 = new Subject()
    subject2.id = '9d5a44d6-22a6-4f65-bb93-e290f7b87a9f'
    subject2.name = 'Science'

    newTeacher.subjects = [subject1, subject2]

    expect(newTeacher.subjects).toHaveLength(2)
    expect(newTeacher.subjects).toContainEqual(subject1)
    expect(newTeacher.subjects).toContainEqual(subject2)
  })
})
