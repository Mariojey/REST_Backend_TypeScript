import { Router } from "express";
import { catchError } from "../catchError";
import { createItemController, deleteItemController, getItemByIdController, getItemsController, updateItemController } from "../controllers/itemController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const itemRouter:Router = Router();

itemRouter.post('/',[authMiddleware,adminMiddleware] , catchError(createItemController));

itemRouter.get('/', [authMiddleware, adminMiddleware], catchError(getItemsController));

itemRouter.get('/:id', [authMiddleware, adminMiddleware], catchError(getItemByIdController));

itemRouter.put('/:id', [authMiddleware, adminMiddleware], catchError(updateItemController));

itemRouter.delete('/:id', [authMiddleware, adminMiddleware], catchError(deleteItemController));

export default itemRouter;