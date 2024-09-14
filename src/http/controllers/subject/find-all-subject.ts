import { makeFindAllSubjectUseCase } from '@/use-cases/factory/subject/make-find-all-subject-use-case'
import { Request, Response } from 'express'

export async function findAllSubject(req: Request, res: Response) {
  try {
    const { page, limit } = req.body

    const findAllSubjectUseCase = makeFindAllSubjectUseCase()

    const subjects = await findAllSubjectUseCase.handler(page, limit)

    return res.status(200).json(subjects)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Subject not found') {
        return res.status(404).json({})
      } else {
        // Tratar outros erros
        console.error('Unexpected error:', error)
        return res.status(500).json({ message: 'An unexpected error occurred' })
      }
    } else {
      // Tratar casos onde o erro não é uma instância de Error
      console.error('Unexpected error type:', error)
      return res.status(500).json({ message: 'An unexpected error occurred' })
    }
  }
}
