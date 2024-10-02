import { Router } from 'express'
import { validateCreateStudent } from '@/http/middlewares/student/validation-create-student'
import { getAllStudents } from '@/http/controllers/student/get-all-students'
import { create } from '@/http/controllers/teacher/create'
import { update } from '@/http/controllers/teacher/update'
import { deleteTeacher } from './delete'
import { validationFindAll } from '@/http/middlewares/utils/validation-find-all'
import { isNotTeacher } from '@/http/middlewares/teacher/is-not-teacher'

const router = Router()

router.get('/', validationFindAll, getAllStudents)
router.post('/', isNotTeacher, validateCreateTeacher, create)
router.put('/:id', update)
router.delete('/:id', deleteTeacher)

export default router
