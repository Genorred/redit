import {Router} from "express";
import topicController from "../controllers/TopicController.js";
import {checkRole} from "../middlewares/CheckRoleMiddleware.js";

const router = new Router()
router.post('', checkRole('ADMIN'), topicController.createTopic)
router.put('', checkRole('ADMIN'), topicController.updateTopic)
router.delete('/:id', checkRole('ADMIN'), topicController.deleteTopic)
router.get('', topicController.getTopics)
export default router