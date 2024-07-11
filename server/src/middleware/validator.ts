import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { BadRequestError } from "../error/error";

// middleware to validate request parameters
export function validateReqParams(schema: Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req.params);

        if (error) {
            next(new BadRequestError(error.message)); // passes validation error to error handling middleware
        }

        req.params = value; // assign validated values back to request parameters

        next();
    };
}

// middleware to validate request body
export function validateReqBody(schema: Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req.body);

        if (error) {
            next(new BadRequestError(error.message));
        }

        req.body = value;

        next();
    };
}
