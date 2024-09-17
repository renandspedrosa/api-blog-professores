import { Router } from 'express'
import { create } from './create'
import { findUser } from './find-user'
import { validateCreateUser } from '@/http/middlewares/user/validation-create-user'
import { signin } from './signin'
// import { validateJwt } from '@/http/middlewares/jwt-validate'

const router = Router()

router.post('/', validateCreateUser, create)
router.get('/:id', findUser)
router.post('/signin', validateCreateUser, signin)

export default router
