import { makeGetAllTeachersUseCase } from '@/use-cases/factory/teacher/make-get-all-teachers-use-case'
import { Request, Response } from 'express'

export async function getAllTeachers(req: Request, res: Response) {
  try {
    const { page, limit } = req.body

    const findAllTeachersUseCase = makeGetAllTeachersUseCase()
    const teachers = await findAllTeachersUseCase.handler(page, limit)

    return res.status(200).json(teachers)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Teacher not found') {
        return res.status(404).json({})
      } else {
        console.error('Unexpected error:', error)
        return res.status(500).json({ message: 'An unexpected error occurred' })
      }
    } else {
      console.error('Unexpected error type:', error)
      return res.status(500).json({ message: 'An unexpected error occurred' })
    }
  }
}
