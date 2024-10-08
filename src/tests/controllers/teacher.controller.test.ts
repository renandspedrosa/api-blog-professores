import request from 'supertest'
import app from '@/app' // your Express app
import { appDataSource } from '@/lib/typeorm/typeorm'
import { hash } from 'bcryptjs'

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
      email: 'renan@example.com',
      password: '123',
      subjects: [
        {
          name: 'Matemática',
        },
      ],
    }
    const hashedPassword = await hash(teacherData.password, 8)

    const response = await request(app).post('/teacher').send(teacherData)

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('user_id')
    expect(response.body).toHaveProperty('subjects')

    // Verificando se o email foi corretamente atribuído
    expect(response.body.user.email).toBe(teacherData.email)

    // Verificando se o password foi hasheado
    const userResponse = response.body.user
    expect(userResponse.password).not.toBe(teacherData.password)
    expect(userResponse.password).toBe(hashedPassword)

    // Verificando se os subjects foram salvos corretamente
    expect(response.body.subjects).toEqual(
      expect.arrayContaining(teacherData.subjects),
    )
  })

  //   it('POST /teacher - should return 400 if email is not unique', async () => {
  //     const teacherData = {
  //       name: 'Jane Doe',
  //       email: 'johndoe@example.com', // Email duplicado
  //       password: 'securepassword456',
  //       subjects: ['History'],
  //     }

  //     const response = await request(app).post('/teacher').send(teacherData)

  //     expect(response.status).toBe(400)
  //     expect(response.body).toHaveProperty('message')
  //     expect(response.body.message).toBe('Email already in use')
  //   })
})
