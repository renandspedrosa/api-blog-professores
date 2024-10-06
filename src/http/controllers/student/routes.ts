import { Router } from 'express'
import { getAllStudents } from '@/http/controllers/student/get-all-students'
import { create } from '@/http/controllers/student/create'
import { update } from '@/http/controllers/student/update'
import { deleteStudent } from './delete'
import { validationFindAll } from '@/http/middlewares/utils/validation-find-all'
// import { isNotStudent } from '@/http/middlewares/student/is-not-student'
import { validateCreateUser } from '@/http/middlewares/user/validation-create-user'
import { validateCreateUserWithUniqueEmail } from '@/http/middlewares/user/validation-unique-email'

const router = Router()

router.get('/', validationFindAll, getAllStudents)
router.post('/', validateCreateUserWithUniqueEmail, validateCreateUser, create)
router.put('/:id', update)
router.delete('/:id', deleteStudent)

export default router
