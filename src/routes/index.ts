import { Router } from "express";
import authRouter from "./authRouter";

const rootRouter:Router = Router();

rootRouter.use('/auth', authRouter);

export default rootRouter;