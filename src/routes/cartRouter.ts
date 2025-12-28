import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { catchError } from "../catchError";
import { addItemToCart, getCart, removeItemFromCart, updateItemQuantity } from "../controllers/cartController";

const cartRouter: Router = Router();

cartRouter.get("/", [authMiddleware], catchError(getCart))
cartRouter.post("/", [authMiddleware], catchError(addItemToCart))
cartRouter.delete("/:id", [authMiddleware], catchError(removeItemFromCart))
cartRouter.put("/:id", [authMiddleware], catchError(updateItemQuantity))

export default cartRouter;