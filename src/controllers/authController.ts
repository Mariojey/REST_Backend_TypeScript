import type { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma";
import { hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../exceptions/badRequest";
import { ErrorCodes } from "../exceptions";
import { UnprocessableEntityError } from "../exceptions/credsChecking";
import { SignUpSchema } from "../schema/users";
import { NotFoundError } from "../exceptions/notFound";

export const signUpController = async (req: Request, res: Response, next: NextFunction) => {

    SignUpSchema.parse(req.body);

    const { username, email, password } = req.body; 
    let user = await prisma.user.findFirst({
        where: {
            OR: [
                { email: email },
                { username: username }
            ]
        }
    });
    if(user) {
        new BadRequestError("User with given email or username already exists", ErrorCodes.USER_ALREADY_EXISTS);
    }
    user = await prisma.user.create({
        data:{
            username,
            email,
            password: hashSync(password, 10)
        }
    })
    await prisma.$disconnect();
    res.json(user);

}

export const loginController = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    let user = await prisma.user.findFirst({
        where: {
            email: email
        }
    });

    if(!user){
        throw new NotFoundError("User with given email does not exist", ErrorCodes.USER_NOT_FOUND);
    }

    if(!compareSync(password, user.password)){
        throw new BadRequestError("Incorrect password", ErrorCodes.INVALID_CREDENTIALS);
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
    );

    await prisma.$disconnect();

    res.json({ user, token });

}

export const getProfileController = async(req: Request, res: Response) => {
    res.json(req.user);
}