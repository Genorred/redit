import {Router} from "express";
import RatingController from "../controllers/RatingController.js";
import {checkRole} from "../middlewares/CheckRoleMiddleware.js";

const router = new Router()
router.post('/', checkRole('USER'), RatingController.createRating)
router.put('/', checkRole('USER'), RatingController.updateRating)
router.delete('/', checkRole('USER'), RatingController.removeRating)
router.get('/', RatingController.countRating)
export default router