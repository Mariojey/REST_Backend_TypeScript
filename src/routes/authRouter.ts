import { Router } from "express";
import { loginController, signUpController } from "../controllers/authController";
import { catchError } from "../catchError";

const authRouter:Router = Router();

// authRouter.get("/login", loginController);
authRouter.post("/signup", catchError(signUpController));
authRouter.post("/login", catchError(loginController));

export default authRouter;