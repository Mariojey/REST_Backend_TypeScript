import { Router } from "express";
import { getProfileController, loginController, signUpController } from "../controllers/authController";
import { catchError } from "../catchError";
import { authMiddleware } from "../middlewares/authMiddleware";

const authRouter:Router = Router();

// authRouter.get("/login", loginController);
authRouter.post("/signup", catchError(signUpController));
authRouter.post("/login", catchError(loginController));
authRouter.get("/profile", [authMiddleware], catchError(getProfileController));

export default authRouter;