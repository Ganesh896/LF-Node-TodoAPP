import { Response, NextFunction } from "express";
import { Request } from "../interface/auth";

import loggerWithNameSpace from "../utils/logger";
import { Logger } from "winston";

const logger = loggerWithNameSpace("RequestLogger");

// middleware to log incoming requests
export function requestLogger(req: Request, res: Response, next: NextFunction) {
    logger.info(`${req.method}: ${req.url}`); // logs the HTTP method and the request URL
    next();
}
