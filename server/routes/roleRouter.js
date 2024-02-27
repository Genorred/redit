import {Router} from "express";
import postRouter from "./postRouter.js";
import userRouter from "./userRouter.js";
import topicRouter from "./topicRouter.js";
import commentRouter from "./commentRouter.js";
import answerRouter from "./answerRouter.js";
import roleController from "../controllers/RoleController.js";
import {checkRole} from "../middlewares/CheckRoleMiddleware.js";

const router = new Router()
router.post('/', checkRole('ADMIN'), roleController.createRole)
router.put('/add', checkRole('ADMIN'), roleController.addRole)
router.put('/remove', checkRole('ADMIN'), roleController.removeRole)
router.delete('/', checkRole('ADMIN'), roleController.deleteRole)
router.get('/', roleController.getRoles)
export default router