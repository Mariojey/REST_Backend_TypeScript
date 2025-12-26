import { Router } from "express";
import authRouter from "./authRouter";
import itemRouter from "./itemRouter";

const rootRouter:Router = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/items', itemRouter);

export default rootRouter;