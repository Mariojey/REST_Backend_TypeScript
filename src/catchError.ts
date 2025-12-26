import type { Request, Response,  NextFunction } from "express"
import { ErrorCodes, HttpException } from "./exceptions";
import { InternalException } from "./exceptions/internalException";

export const catchError = (controller: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            await controller(req, res, next);
        }catch(error: any){

            let exception: HttpException;

            if( error instanceof HttpException){
                exception = error;
            }else{ 
                exception = new InternalException("Internal server error", error, ErrorCodes.INTERNAL_SERVER_ERROR);
            }

            next(exception);
        }
    }
}