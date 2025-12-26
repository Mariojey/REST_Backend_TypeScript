import type { Request, Response, NextFunction } from 'express';
import { LocalizationSchema } from '../schema/users';
import { prisma } from '../prisma';
import { NotFoundError } from '../exceptions/notFound';
import { ErrorCodes } from '../exceptions';


export const getLocalizationsController = async (req: Request, res: Response) => {

    const localizations = await prisma.localization.findMany({
        where: {
            userId: req.user.id
        }
    });

    await prisma.$disconnect();

    res.json(localizations);

}

export const createLocalizationController = async (req: Request, res: Response) => {

    LocalizationSchema.parse(req.body);

    const localization = await prisma.localization.create({
        data: {
            ...req.body,
            userId: req.user.id
        }
    })

    await prisma.$disconnect();

    res.json(localization);

}

export const deleteLocalizationController = async (req: Request, res: Response) => {

    try{

        await prisma.localization.delete({
            where: {
                id: Number(req.params.id)
            }
        })

        await prisma.$disconnect();

        res.json({ message: "Localization deleted successfully" });

    }catch(error){

        throw new NotFoundError("Localization not found", ErrorCodes.RESOURCE_NOT_FOUND);
    
    }

}