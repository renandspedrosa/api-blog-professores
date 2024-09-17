import { expressjwt } from 'express-jwt'
import { env } from '@/env'
import { Request, Response, NextFunction } from 'express'

// Função de geração de token JWT
import jwt from 'jsonwebtoken'

const jwtSecret = env.JWT_SECRET

// Middleware de validação JWT
export const validateJwt = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Middleware express-jwt para validar o token nas outras rotas
  expressjwt({
    secret: jwtSecret,
    algorithms: ['HS256'],
    requestProperty: 'auth',
  })(req, res, next) // Passa a requisição para o middleware express-jwt
}

export const generateJwt = (payload: object) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: '1h' })
}
