// @ts-ignore
import app from '../public/app'
import { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res)
}
