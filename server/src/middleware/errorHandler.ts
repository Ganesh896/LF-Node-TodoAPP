import { NextFunction, Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import { ConflictError, ForbiddenError, NotFoundError, UnauthenticatedError } from "../error/error";
import logger from "../utils/logger";

export function notFoundError(req: Request, res: Response) {
    return res.status(HttpStatusCodes.NOT_FOUND).json({
        status: "error",
        message: "Route Not Found",
    });
}

export function genericErrorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    if (error instanceof ForbiddenError) {
        return res.status(HttpStatusCodes.FORBIDDEN).json({
            status: "error",
            message: error.message,
        });
    }
    if (error instanceof NotFoundError) {
        return res.status(HttpStatusCodes.NOT_FOUND).json({
            status: "error",
            message: error.message,
        });
    }
    if (error instanceof ConflictError) {
        return res.status(HttpStatusCodes.CONFLICT).json({
            status: "error",
            message: error.message,
        });
    }
    if (error instanceof UnauthenticatedError) {
        return res.status(HttpStatusCodes.UNAUTHORIZED).json({
            status: "error",
            message: error.message,
        });
    }
}
