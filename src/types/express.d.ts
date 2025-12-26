import { User } from "../../generated/prisma/client";
import express from "express";

declare module 'express' {
    export interface Request {
        user: User
    }
}