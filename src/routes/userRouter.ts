import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";
import { catchError } from "../catchError";
import { createLocalizationController, getLocalizationsController, updateLocalizationController } from "../controllers/userController";

const userRouter : Router = Router();

userRouter.get('/localizations', [authMiddleware], catchError(getLocalizationsController));

userRouter.post('/localizations', [authMiddleware], catchError(createLocalizationController));

userRouter.put('/localizations/:id', [authMiddleware], catchError(updateLocalizationController));

export default userRouter;