import type {Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions";

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    if(user.role == "ADMIN"){
        next();
    }else{
        next(new UnauthorizedError("Unauthorized", ErrorCodes.NO_TOKEN_PROVIDED));
    }

}