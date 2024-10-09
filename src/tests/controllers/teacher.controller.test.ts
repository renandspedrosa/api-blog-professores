import request from 'supertest'
import app from '@/app'
import { appDataSource } from '@/lib/typeorm/typeorm'

describe('Teacher Controller', () => {
  let teacherId: number

  afterAll(async () => {
    if (appDataSource.isInitialized) {
      await appDataSource.destroy()
    }
  })

  beforeAll(async () => {
    if (!appDataSource.isInitialized) {
      await appDataSource.initialize()
    }
  })

  it('POST /teacher - should create a new teacher with hashed password', async () => {
    const teacherData = {
      name: 'Renan',
      email: `renan${Date.now()}@example.com`,
      password: '123456',
      subjects: [
        {
          name: 'matemática',
        },
      ],
    }

    const response = await request(app).post('/teacher').send(teacherData)

    expect(response.status).toBe(201)

    expect(response.body).toHaveProperty('name', teacherData.name)
    expect(response.body).toHaveProperty('email', teacherData.email)

    expect(response.body.teachers).toHaveProperty('id')
    expect(response.body.teachers).toHaveProperty('user_id')
    expect(response.body.teachers).toHaveProperty('status', 1)

    teacherId = response.body.teachers.id

    expect(response.body.teachers.subjects).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'matemática', status: 1 }),
      ]),
    )
  })

  it('GET /teacher - should get all teachers with pagination', async () => {
    const requestData = {
      page: 1,
      limit: 10,
    }

    const response = await request(app).get('/teacher').query(requestData)

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          user_id: expect.any(Number),
          name: expect.any(String),
          email: expect.any(String),
          subjects: expect.any(Array),
        }),
      ]),
    )
  })

  it('DELETE /teacher/:id - should delete a teacher', async () => {
    const deleteResponse = await request(app).delete(`/teacher/${teacherId}`)
    expect(deleteResponse.status).toBe(204)
  })
})
