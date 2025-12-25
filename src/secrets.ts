import dotenv from 'dotenv';

dotenv.config();

export const SERVER_HOST = process.env.HOST;
export const SERVER_PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
