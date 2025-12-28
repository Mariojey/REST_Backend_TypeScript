import { Router } from "express";
import authRouter from "./authRouter";
import itemRouter from "./itemRouter";
import userRouter from "./userRouter";

const rootRouter:Router = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/items', itemRouter);
rootRouter.use('/users', userRouter);

export default rootRouter;