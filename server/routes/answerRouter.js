import {Router} from "express";
import answerController from "../controllers/AnswerController.js";
import {checkRole} from "../middlewares/CheckRoleMiddleware.js";
import commentController from "../controllers/CommentController.js";

const router = new Router()
router.post('', checkRole('USER'), answerController.createAnswer)
router.put('', checkRole('USER'), answerController.updateAnswer)
router.delete('', checkRole('USER'), answerController.deleteAnswer)
router.get('', answerController.getAnswers)
export default router