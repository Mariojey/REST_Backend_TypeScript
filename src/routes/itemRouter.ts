import { Router } from "express";
import { catchError } from "../catchError";
import { createItemController } from "../controllers/itemController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const itemRouter:Router = Router();

itemRouter.post('/',[authMiddleware,adminMiddleware] , catchError(createItemController))

export default itemRouter;