import type { Request, Response } from "express";
import { prisma } from "../prisma";
import { NotFoundError } from "../exceptions/notFound";
import { ErrorCodes } from "../exceptions";

export const createItemController = async (req: Request, res: Response) => {

    const item = await prisma.item.create({
        data: {
            ...req.body,
            tags: req.body.tags.join(",")
        }
    })

    await prisma.$disconnect();

    res.json(item);

};

export const getItemsController = async (req: Request, res: Response) => {
    
    const count = await prisma.item.count();

    const items = await prisma.item.findMany({
        skip : Number(req.query.skip) || 0,
        take : Number(req.query.take) || 10
    });

    await prisma.$disconnect();

    res.json({ items, count });


}

export const getItemByIdController = async (req: Request, res: Response) => {

    try{
        const item = await prisma.item.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });

        await prisma.$disconnect();

        if(!item){
            throw new NotFoundError("Item not found", ErrorCodes.RESOURCE_NOT_FOUND);
        }
        res.json(item);

    }catch(error){
        throw new NotFoundError("Items not found", ErrorCodes.RESOURCE_NOT_FOUND);
    }

}

export const updateItemController = async (req: Request, res: Response) => {

    try{

        const item = req.body;

        if(item.tags){
            item.tags = item.tags.join(",");
        }

        const updatedItem = await prisma.item.update({
            where: {
                id: Number(req.params.id)
            },
            data: item
        })

        await prisma.$disconnect();

        res.json(updatedItem);

    }catch(error){
        throw new NotFoundError("Items not found", ErrorCodes.RESOURCE_NOT_FOUND);
    }

}

export const deleteItemController = async (req: Request, res: Response) => {

    try{

        const deletedItem = await prisma.item.delete({
            where: {
                id: Number(req.params.id)
            }
        });

        await prisma.$disconnect();

        res.json(deletedItem);

    }catch(error){
        throw new NotFoundError("Items not found", ErrorCodes.RESOURCE_NOT_FOUND);
    }

}