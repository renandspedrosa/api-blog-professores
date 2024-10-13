import { Student } from '@/entities/student.entity'
import { User } from '@/entities/user.entity'

describe('Entity Student', () => {
  it('It should create a new teacher object and define its values', async () => {
    const newStudent = new Student()
    newStudent.id = 1
    newStudent.user_id = 10
    newStudent.status = 1
    newStudent.created_at = new Date()
    newStudent.updated_at = new Date()

    expect(newStudent).toBeInstanceOf(Student)
    expect(newStudent.id).toBe(1)
    expect(newStudent.user_id).toBe(10)
    expect(newStudent.status).toBe(1)
    expect(newStudent.created_at).toBeInstanceOf(Date)
    expect(newStudent.updated_at).toBeInstanceOf(Date)
    expect(newStudent.user).toBeUndefined()
  })

  it('It should associate a user with the teacher', async () => {
    const newStudent = new Student()
    newStudent.id = 2

    const user = new User()
    user.id = 1
    user.email = 'test@example.com'
    user.password = 'secret'
    user.name = 'Test User'

    newStudent.user = user

    expect(newStudent.user).toBeInstanceOf(User)
    expect(newStudent.user.id).toBe(1)
    expect(newStudent.user.email).toBe('test@example.com')
    expect(newStudent.user.name).toBe('Test User')
  })
})
