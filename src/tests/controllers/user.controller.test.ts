import request from 'supertest'
import app from '@/app'
import { appDataSource } from '@/lib/typeorm/typeorm'

describe('User Controller - findUser', () => {
  let idUser: number
  let email: string
  let password: string

  afterAll(async () => {
    if (appDataSource.isInitialized) {
      await appDataSource.destroy()
    }
  })

  beforeAll(async () => {
    if (!appDataSource.isInitialized) {
      await appDataSource.initialize()
    }

    const teacherData = {
      name: 'User Test',
      email: `teste${Date.now()}@example.com`,
      password: 'password123',
    }

    const teacherResponse = await request(app)
      .post('/teacher')
      .send(teacherData)
    expect(teacherResponse.status).toBe(201)

    idUser = teacherResponse.body.teachers.user_id
  })

  it('GET /user/:id - should find a user as teacher or student', async () => {
    const response = await request(app).get(`/user/${idUser}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('email')

    expect(response.body).toHaveProperty('teachers')
    expect(response.body.teachers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          user_id: idUser,
          status: 1,
        }),
      ]),
    )
  })

  it('PUT /user/:id - should update the user with a hashed password', async () => {
    const updatedUserData = {
      name: 'Updated Name',
      email: `updated${Date.now()}@example.com`,
      password: 'newpassword123',
    }
    email = updatedUserData.email
    password = updatedUserData.password

    const response = await request(app)
      .put(`/user/${idUser}`)
      .send(updatedUserData)

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id', idUser)
    expect(response.body).toHaveProperty('name', updatedUserData.name)

    const getUserResponse = await request(app).get(`/user/${idUser}`)
    expect(getUserResponse.status).toBe(200)
    expect(getUserResponse.body).toHaveProperty('email', updatedUserData.email)
    expect(getUserResponse.body).toHaveProperty('name', updatedUserData.name)
  })

  it('POST /user/signin - should authenticate the user and return a JWT token', async () => {
    const signinData = {
      email,
      password,
    }

    const response = await request(app).post('/user/signin').send(signinData)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
    const token = response.body.token
    expect(typeof token).toBe('string')
    expect(token.length).toBeGreaterThan(0)
  })
})
