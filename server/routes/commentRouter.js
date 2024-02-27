import {Router} from "express";
import commentController from "../controllers/CommentController.js";
import {checkRole} from "../middlewares/CheckRoleMiddleware.js";

const router = new Router()
router.post('', checkRole('USER'), commentController.createComment)
router.put('', checkRole('USER'), commentController.updateComment)
router.delete('', checkRole('USER'), commentController.deleteComment)
router.get('', commentController.getComments)
export default router