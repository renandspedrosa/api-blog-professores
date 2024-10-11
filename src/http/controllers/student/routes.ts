import { Router } from 'express'
import { getAllStudents } from '@/http/controllers/student/get-all-students'
import { create } from '@/http/controllers/student/create'
import { deleteStudent } from './delete'
import { validationFindAll } from '@/http/middlewares/utils/validation-find-all'
import { validateCreateUserWithUniqueEmail } from '@/http/middlewares/user/validation-unique-email'
import { validateCreateStudent } from '@/http/middlewares/student/validation-create-student'

const router = Router()

router.get('/', validationFindAll, getAllStudents)
router.post(
  '/',
  validateCreateUserWithUniqueEmail,
  validateCreateStudent,
  create,
)
router.delete('/:id', deleteStudent)

export default router
