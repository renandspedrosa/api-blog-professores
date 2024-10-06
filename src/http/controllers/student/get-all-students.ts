import { makeGetAllStudentsUseCase } from '@/use-cases/factory/student/make-get-all-students-use-case'
import { Request, Response } from 'express'

export async function getAllStudents(req: Request, res: Response) {
  try {
    const { page, limit } = req.body

    const findAllStudentsUseCase = makeGetAllStudentsUseCase()
    const students = await findAllStudentsUseCase.handler(page, limit)

    return res.status(200).json(students)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'student not found') {
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
