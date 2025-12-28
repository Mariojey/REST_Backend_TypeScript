import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";
import { catchError } from "../catchError";
import { createLocalizationController, getLocalizationsController, deleteLocalizationController, updateUserController } from "../controllers/userController";

const userRouter : Router = Router();

userRouter.get('/localizations', [authMiddleware], catchError(getLocalizationsController));

userRouter.post('/localizations', [authMiddleware], catchError(createLocalizationController));

userRouter.delete('/localizations/:id', [authMiddleware], catchError(deleteLocalizationController));

userRouter.put('/', [authMiddleware], catchError(updateUserController))

export default userRouter;