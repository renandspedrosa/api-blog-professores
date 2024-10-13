import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Express } from 'express'
import { env } from './env'

const PORT = env.PORT

// Defina as opções do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', // Define a versão do OpenAPI
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
  },
  apis: ['./src/http/controllers/**/*.ts'], // Caminho para os arquivos de rotas
}

// Gerar a especificação do Swagger a partir das opções
const swaggerDocs = swaggerJSDoc(swaggerOptions)

export const setupSwagger = (app: Express): void => {
  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}
