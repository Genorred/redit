import {Router} from "express";
import postController from "../controllers/PostController.js";
import {checkRole} from "../middlewares/CheckRoleMiddleware.js";

const router = new Router()
router.post('', checkRole('USER'), postController.createPost)
router.put('', checkRole('USER'), postController.updatePost)
router.delete('/:id', checkRole('USER'), postController.deletePost)
router.get('', postController.getPosts)
router.get('/:id', postController.findPost)
export default router