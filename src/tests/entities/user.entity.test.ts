import { User } from '@/entities/user.entity'
import { Teacher } from '@/entities/teacher.entity'
import { Student } from '@/entities/student.entity'
import { Subject } from '@/entities/subject.entity'

describe('Entity User', () => {
  it('should create a new user object and define its values', async () => {
    const newUser = new User()
    newUser.id = 1
    newUser.email = 'test@example.com'
    newUser.password = 'securepassword'
    newUser.name = 'Test User'

    expect(newUser).toBeInstanceOf(User)
    expect(newUser.id).toBe(1)
    expect(newUser.email).toBe('test@example.com')
    expect(newUser.password).toBe('securepassword')
    expect(newUser.name).toBe('Test User')
    expect(newUser.teachers).toBeUndefined()
    expect(newUser.students).toBeUndefined()
  })

  it('should associate teachers and students with the user', async () => {
    const newUser = new User()
    newUser.id = 2
    newUser.email = 'anotheruser@example.com'
    newUser.password = 'anotherpassword'
    newUser.name = 'Another User'

    const teacher1 = new Teacher()
    teacher1.id = 1
    teacher1.subjects = [new Subject()]

    const teacher2 = new Teacher()
    teacher2.id = 2
    teacher2.subjects = [new Subject()]

    const student1 = new Student()
    student1.id = 1

    const student2 = new Student()
    student2.id = 2

    newUser.teachers = [teacher1, teacher2]
    newUser.students = [student1, student2]

    expect(newUser.teachers).toHaveLength(2)
    expect(newUser.teachers).toContainEqual(teacher1)
    expect(newUser.teachers).toContainEqual(teacher2)

    expect(newUser.students).toHaveLength(2)
    expect(newUser.students).toContainEqual(student1)
    expect(newUser.students).toContainEqual(student2)
  })
})
