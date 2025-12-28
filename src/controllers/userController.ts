import type { Request, Response, NextFunction } from 'express';
import { LocalizationSchema, UpdateUserSchema } from '../schema/users';
import { prisma } from '../prisma';
import { NotFoundError } from '../exceptions/notFound';
import { ErrorCodes } from '../exceptions';
import { Localization } from '../../generated/prisma/client';
import { BadRequestError } from '../exceptions/badRequest';

export const updateUserController = async (req: Request, res: Response) => {

    const dataToUse = UpdateUserSchema.parse(req.body);

    let shippingLocalization : Localization;
    let billingLocalization : Localization;

    if(dataToUse.defaultShippingLocalization){

        try{

            shippingLocalization = await prisma.localization.findFirstOrThrow({

                where: {
                    id: dataToUse.defaultShippingLocalization
                }

            })
        }catch(error){

            throw new NotFoundError("Localization not found", ErrorCodes.RESOURCE_NOT_FOUND);
        
        }

        if(shippingLocalization.userId !== req.user.id) {
            throw new BadRequestError("Shipping localization does not belong to the user", ErrorCodes.VALIDATION_ERROR);
        }

    }

    if(dataToUse.defaultBillingLocalization){
        try{
            billingLocalization = await prisma.localization.findFirstOrThrow({
                where: {
                    id: dataToUse.defaultBillingLocalization
                }
            })
            if(billingLocalization.userId !== req.user.id) {
                throw new BadRequestError("Billing localization does not belong to the user", ErrorCodes.VALIDATION_ERROR);
            }
        }catch(error){
            throw new NotFoundError("Localization not found", ErrorCodes.RESOURCE_NOT_FOUND);
        }

        if(billingLocalization.userId !== req.user.id) {
            throw new BadRequestError("Billing localization does not belong to the user", ErrorCodes.VALIDATION_ERROR);
        }
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: req.user.id
        },
        data: dataToUse,
    })

    await prisma.$disconnect();

    res.json(updatedUser);
}

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