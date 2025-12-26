import { HttpException } from ".";

export class UnauthorizedError extends HttpException {
    constructor(message: string, errorCode: number, errors?: any) {
        super(message, errorCode, 401, errors);
    }
}