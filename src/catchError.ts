import type { Request, Response,  NextFunction } from "express"
import { ErrorCodes, HttpException } from "./exceptions";
import { InternalException } from "./exceptions/internalException";
import { ZodError } from "zod";
import { BadRequestError } from "./exceptions/badRequest";

export const catchError = (controller: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            await controller(req, res, next);
        }catch(error: any){

            let exception: HttpException;

            if( error instanceof HttpException){
                exception = error;
            }else{ 

                if( error instanceof ZodError) {
                    exception = new BadRequestError("Validation error", ErrorCodes.VALIDATION_ERROR);
                }else{
                    exception = new InternalException("Internal server error", error, ErrorCodes.INTERNAL_SERVER_ERROR);
                }
            }

            next(exception);
        }
    }
}