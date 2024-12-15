import { Router } from 'express'
import { create } from '@/http/controllers/post/create'
import { validateCreatePost } from '@/http/middlewares/post/validation-create-post'
import { validationFindPost } from '@/http/middlewares/post/validation-find-post'
import { findPostByTeacher } from '@/http/controllers/post/find-post-by-teacher'
import { deletePost } from '@/http/controllers/post/delete-post'
import { updatePost } from './update-post'
import { findPost } from './find-post'
import { findAllPost } from './find-all-post'
import { validationFindAllPost } from '@/http/middlewares/post/validation-find-all-post'
import { isTeacher } from '@/http/middlewares/teacher/is-teacher'
import { findPostByTerm } from './find-post-by-term'
import { validationFindByTerm } from '@/http/middlewares/post/validation-find-by-term'
import { validationFindAll } from '@/http/middlewares/utils/validation-find-all'
import { validateCreatePostViewed } from '@/http/middlewares/post/validation-create-post-viewed'
import { createPostViewed } from './create-post-viewed'
import { findCommentsByPostId } from '@/http/controllers/post/find-comments-by-post-id'
import { isStudent } from '@/http/middlewares/student/is-student'
import { validateJwt } from '@/http/middlewares/jwt-validate'
import { uploadFile } from '@/http/middlewares/post/upload-file'

const router = Router()

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Cria um novo post
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - tags
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título do post
 *                 example: "Meu Primeiro Post"
 *               content:
 *                 type: string
 *                 description: Conteúdo do post
 *                 example: "Este é o conteúdo do meu primeiro post."
 *               path_img:
 *                 type: string
 *                 description: Url para a imagem do post
 *                 example: "https://estudantemoderno.com.br/wp-content/uploads/pedagogia-300x200.png"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de tags associadas ao post
 *                 example: [{"name":"educação"}]
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 */

router.post('/', validateJwt, uploadFile, isTeacher, validateCreatePost, create)

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Recupera todos os posts
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Número da página para paginação dos resultados
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           example: 15
 *         description: Número máximo de posts a serem retornados por página
 *       - in: query
 *         name: tag
 *         required: false
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *           example: [1, 2]
 *         description: Lista de tags associadas ao post
 *       - in: query
 *         name: term
 *         required: false
 *         schema:
 *           type: string
 *           example: "Meu Primeiro"
 *         description: Termo a ser pesquisado nos posts
 *     responses:
 *       200:
 *         description: Lista de posts recuperada com sucesso
 */

router.get('/', validationFindAllPost, findAllPost)

/**
 * @swagger
 * /posts/teacher/{teacherId}:
 *   get:
 *     summary: Recupera todos os posts de um professor específico
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID do professor para filtrar os posts
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Número da página para paginação dos resultados
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Número máximo de posts a serem retornados por página
 *     responses:
 *       200:
 *         description: Lista de posts do professor recuperada com sucesso
 */

router.get('/teacher/:teacherId', validationFindAll, findPostByTeacher)

/**
 * @swagger
 * /posts/search:
 *   get:
 *     summary: Busca posts pelo termo especificado
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: term
 *         required: true
 *         schema:
 *           type: string
 *           example: "Meu Primeiro"
 *         description: Termo a ser pesquisado nos posts
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Número da página para paginação dos resultados
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Número máximo de posts a serem retornados por página
 *     responses:
 *       200:
 *         description: Lista de posts que correspondem ao termo de pesquisa
 */

router.get('/search', validationFindByTerm, findPostByTerm)

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Atualiza um post existente
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Título do Post Atualizado"
 *                 description: Novo título do post
 *               content:
 *                 type: string
 *                 example: "Conteúdo do post atualizado."
 *                 description: Novo conteúdo do post
 *               path_img:
 *                 type: string
 *                 example: "https://estudantemoderno.com.br/wp-content/uploads/pedagogia-300x200.png"
 *                 description: Novo conteúdo do post
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: []
 *                 description: Lista de tags associadas ao post
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso
 */

router.put(
  '/:id',
  validateJwt,
  isTeacher,
  validationFindPost,
  uploadFile,
  updatePost,
)

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Busca um post específico
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post a ser buscado
 *     responses:
 *       200:
 *         description: Post encontrado
 */

router.get('/:id', validationFindPost, findPost)

/**
 * @swagger
 * /posts/{post_id}/comments:
 *   get:
 *     summary: Busca os comentários de um post específico
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post para o qual os comentários serão buscados
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Número da página para paginação dos resultados
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           example: 15
 *         description: Número máximo de posts a serem retornados por página
 *     responses:
 *       200:
 *         description: Comentários encontrados
 */

router.get('/:id/comments', findCommentsByPostId)

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Remove um post específico
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post que será removido
 *     responses:
 *       204:
 *         description: Post removido com sucesso
 */

router.delete('/:id', validateJwt, isTeacher, validationFindPost, deletePost)

/**
 * @swagger
 * /posts/{post_id}/viewed:
 *   post:
 *     summary: Registra a visualização de um post por um estudante, PRECISA ESTAR LOGADO COMO ESTUDANTE
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post que foi visualizado
 *     responses:
 *       201:
 *         description: Visualização do post registrada com sucesso
 */

router.post(
  '/:post_id/viewed',
  validateJwt,
  isStudent,
  validateCreatePostViewed,
  createPostViewed,
)

export default router
