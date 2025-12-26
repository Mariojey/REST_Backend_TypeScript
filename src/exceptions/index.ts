export class HttpException extends Error {
    message: string;
    errorCode: any;
    status: number;

    errors: ErrorCodes;

    constructor(message: string, errorCode: ErrorCodes, status: number, errors: any) {
        
        super(message);

        this.message = message;
        this.errorCode = errorCode;
        this.status = status;
        this.errors = errors;
    }
}

export enum ErrorCodes {
    USER_NOT_FOUND = 1001,
    INVALID_CREDENTIALS = 1002,
    USER_ALREADY_EXISTS = 1003,
    VALIDATION_ERROR = 1004,
    INTERNAL_SERVER_ERROR = 1005,
    NO_TOKEN_PROVIDED = 1006,
    INVALID_TOKEN = 1007,
    RESOURCE_NOT_FOUND = 1008
}