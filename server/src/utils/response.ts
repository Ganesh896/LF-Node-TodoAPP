import HttpStatusCodes from "http-status-codes";

import { Response } from "express";
export const successResponse = (res: Response, message: string, data: any) => {
    res.status(HttpStatusCodes.OK).json({
        status: "success",
        message,
        data,
    });
};
