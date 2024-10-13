import request from 'supertest'
import app from '@/app'
import { appDataSource } from '@/lib/typeorm/typeorm'

describe('Student Controller', () => {
  let studentId: number

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

  it('POST /student - should create a new student with hashed password', async () => {
    const studentDate = {
      name: 'Renan',
      email: `renan${Date.now()}@example.com`,
      password: '123456',
    }

    const response = await request(app).post('/student').send(studentDate)

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('name', studentDate.name)
    expect(response.body).toHaveProperty('email', studentDate.email)
    expect(response.body.students).toHaveProperty('id')
    expect(response.body.students).toHaveProperty('user_id')
    expect(response.body.students).toHaveProperty('status', 1)
    studentId = response.body.students.id
  })

  it('GET /student - should get all students with pagination', async () => {
    const requestData = {
      page: 1,
      limit: 10,
    }

    const response = await request(app).get('/student').query(requestData)

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          user_id: expect.any(Number),
          name: expect.any(String),
          email: expect.any(String),
        }),
      ]),
    )
  })

  it('DELETE /student/:id - should delete a teacher', async () => {
    const deleteResponse = await request(app).delete(`/student/${studentId}`)
    expect(deleteResponse.status).toBe(204)
  })
})
