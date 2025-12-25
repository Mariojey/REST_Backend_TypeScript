import { ErrorCodes, HttpException } from ".";

export class NotFoundError extends HttpException {
    constructor(message: string, errorCode: ErrorCodes) {
        super(message, errorCode, 404, null);
    }
}