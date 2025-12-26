import type { Request, Response } from "express";
import { prisma } from "../prisma";

export const createItemController = async (req: Request, res: Response) => {

    const item = await prisma.item.create({
        data: {
            ...req.body,
            tags: req.body.tags.join(",")
        }
    })

    res.json(item);

};