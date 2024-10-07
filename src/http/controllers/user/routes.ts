import { Router } from 'express'
import { create } from './create'
import { findUser } from './find-user'
import { validateCreateUser } from '@/http/middlewares/user/validation-create-user'
import { signin } from './signin'
import { validateCreateUserWithUniqueEmail } from '@/http/middlewares/user/validation-unique-email'
import { update } from './update'
// import { validateJwt } from '@/http/middlewares/jwt-validate'

const router = Router()

router.post('/', validateCreateUser, validateCreateUserWithUniqueEmail, create)
router.get('/:id', findUser)
router.put('/:id', update)
router.post('/signin', validateCreateUser, signin)

export default router
