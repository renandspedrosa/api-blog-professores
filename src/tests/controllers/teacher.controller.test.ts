import request from 'supertest'
import app from '@/app' // your Express app
import { appDataSource } from '@/lib/typeorm/typeorm'

describe('Teacher Controller', () => {
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

    // Verifique as propriedades dentro de response.body
    expect(response.body).toHaveProperty('name', teacherData.name)
    expect(response.body).toHaveProperty('email', teacherData.email)

    // Verifique as propriedades dentro de response.body.teachers
    expect(response.body.teachers).toHaveProperty('id')
    expect(response.body.teachers).toHaveProperty('user_id')
    expect(response.body.teachers).toHaveProperty('status', 1)

    // Verifique se os subjects foram salvos corretamente
    expect(response.body.teachers.subjects).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'matemática', status: 1 }),
      ]),
    )
  })
})
