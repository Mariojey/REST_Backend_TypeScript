import { NextFunction } from "express";
import { UnauthorizedError } from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prisma } from "../prisma";
import type {Request, Response } from "express";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization

    if(!token){
        next(new UnauthorizedError("No token provided", ErrorCodes.NO_TOKEN_PROVIDED));
    }

    try{
        const tokenEncode: { id: number} = jwt.verify(token as string, JWT_SECRET as string) as any;


        const user = await prisma.user.findFirst({
            where:{
                id: tokenEncode.id
            }
        })

        if(!user){
            next(new UnauthorizedError("Unauthorized", ErrorCodes.NO_TOKEN_PROVIDED));
        }

        req.user = user;
        next();
    }catch(error){
        next(new UnauthorizedError("Invalid token", ErrorCodes.INVALID_TOKEN));
    }

}