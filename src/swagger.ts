import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Express } from 'express'
import { env } from './env'

const PORT = env.PORT

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API blog dos professores usando Swagger com TypeScript',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
    tags: [
      {
        name: 'User',
        description: 'Operações relacionadas a usuários',
      },
      {
        name: 'Teacher',
        description: 'Operações relacionadas a professores',
      },
      {
        name: 'Student',
        description: 'Operações relacionadas a estudantes',
      },
      {
        name: 'Posts',
        description: 'Operações relacionadas as postagem dos professores',
      },
      {
        name: 'Comments',
        description: 'Operações relacionadas aos comentários',
      },
      {
        name: 'Subject',
        description: 'Operações relacionadas as disciplinas',
      },
      {
        name: 'Tag',
        description: 'Operações relacionadas as tags',
      },
    ],
  },
  apis: ['./src/http/controllers/**/*.ts'],
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

export const setupSwagger = (app: Express): void => {
  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}
