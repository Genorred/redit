import {Router} from "express";
import UserController from "../controllers/UserController.js";
import {checkRole} from "../middlewares/CheckRoleMiddleware.js";

const router = new Router()
router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.get('/check', checkRole('USER'), UserController.check)
router.delete('/delete', checkRole('USER'), UserController.delete)
export default router