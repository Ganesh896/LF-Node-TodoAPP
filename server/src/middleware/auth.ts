import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import config from "../config";

export function auth(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    console.log(authorization);

    if (!authorization) {
        next(new Error("Unauthenticated"));

        return;
    }

    const token = authorization.split(" ");

    if (token.length !== 2 || token[0] !== "Bearer") {
        next(new Error("Unauthenticated"));

        return;
    }

    console.log(token);

    const payload: any = verify(token[1], config.jwt.secret!);
    req.body.user_id = payload.id;

    next();
}
