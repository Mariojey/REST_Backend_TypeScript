import type { Request, Response } from "express";
import { AddCartSchema, UpdateQuantitySchema } from "../schema/cart";
import { NotFoundError } from "../exceptions/notFound";
import { ErrorCodes } from "../exceptions";
import { CardItem, Item } from "../../generated/prisma/client";
import { prisma } from "../prisma";

export const getCart = async (req: Request, res: Response) => {

    const cart = await prisma.cardItem.findMany({
        where: {
            userId: req.user.id
        },
        include: {
            item: true
        }
    })

    await prisma.$disconnect();

    res.json(cart);

}

export const addItemToCart = async (req: Request, res: Response) => {

    const dataToSet =  AddCartSchema.parse(req.body);

    let item: Item;

    try{
        item = await prisma.item.findFirstOrThrow({
            where: {
                id: dataToSet.itemId
            }
        })
    }catch(error){
        throw new NotFoundError("Item not found", ErrorCodes.RESOURCE_NOT_FOUND)
    }

    const cart = await prisma.cardItem.create({
        data: {
            userId: req.user.id,
            itemId: item.id,
            quantity: dataToSet.quantity
        }
    })

    await prisma.$disconnect();

    res.json(cart);

}

export const removeItemFromCart = async (req: Request, res: Response) => {

    let cardItem: CardItem;

    try{
        cardItem = await prisma.cardItem.findFirstOrThrow({
            where: {
                id: Number(req.params.id),
            }
        });
    }catch(error){
        throw new NotFoundError("Cart item not found", ErrorCodes.RESOURCE_NOT_FOUND);
    }

    if(cardItem.userId !== req.user.id){
        throw new NotFoundError("Cart item not found", ErrorCodes.RESOURCE_NOT_FOUND);
    }

    try{
        await prisma.cardItem.delete({
            where: {
                id: Number(req.params.id)
            }
        });

        await prisma.$disconnect();

        res.json({ message: "Item removed from cart successfully" });
    }catch(error){
        throw new NotFoundError("Cart item not found", ErrorCodes.RESOURCE_NOT_FOUND);
    }

}

export const updateItemQuantity = async (req: Request, res: Response) => {

    const dataToSet = UpdateQuantitySchema.parse(req.body);

    const updatedCartItem = await prisma.cardItem.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            quantity: dataToSet.quantity
        }
    });

    await prisma.$disconnect();

    res.json(updatedCartItem);

}