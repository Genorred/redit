import {Router} from "express";
import postRouter from "./postRouter.js";
import userRouter from "./userRouter.js";
import topicRouter from "./topicRouter.js";
import commentRouter from "./commentRouter.js";
import answerRouter from "./answerRouter.js";
import roleRouter from "./roleRouter.js";
import ratingRouter from "./ratingRouter.js";

const router = new Router()
router.use('/user', userRouter)
router.use('/topic', topicRouter)
router.use('/post', postRouter)
router.use('/comment', commentRouter)
router.use('/answer', answerRouter)
router.use('/role', roleRouter)
router.use('/rating', ratingRouter)
export default router