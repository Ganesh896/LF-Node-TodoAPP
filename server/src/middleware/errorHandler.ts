import { NextFunction, Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import { BadRequestError, ConflictError, ForbiddenError, NotFoundError, UnauthenticatedError } from "../error/error";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("ErrorHandler");

// handle route not found errors
export function notFoundError(req: Request, res: Response) {
    return res.status(HttpStatusCodes.NOT_FOUND).json({
        status: "error",
        message: "Route Not Found",
    });
}

// handle specific types of errors with appropriate HTTP status codes and messages
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
    if (error instanceof BadRequestError) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
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

    // log any other unknown errors
    logger.error(`Unhandled error: ${error.message}`);

    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: "Internal Server Error",
    });
}
