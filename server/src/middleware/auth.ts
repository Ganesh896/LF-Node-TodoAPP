import { Response, NextFunction } from "express";
import { Request } from "../interface/auth";
import { verify } from "jsonwebtoken";
import config from "../config";
import { User } from "../interface/user";
import { ForbiddenError, UnauthenticatedError } from "../error/error";
import { PermissionModel } from "../helpers/checkPermissions";

// middleware to authenticate user based on JWT token
export function authenticate(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    // check if authorization header exists
    if (!authorization) {
        next(new UnauthenticatedError("access token not found"));
        return;
    }

    const token = authorization.split(" ");

    // validate token format
    if (token.length !== 2 || token[0] !== "Bearer") {
        next(new UnauthenticatedError("Invalid access token"));
        return;
    }

    try {
        // verify and decode JWT token
        const payload: User = verify(token[1], config.jwt.secret!) as User;

        req.user = payload;
    } catch (error) {
        next(new UnauthenticatedError("Unauthenticated"));
    }

    next(); // pass control to the next middleware or route handler
}

// middleware to authorize user based on permissions
export function authorize(permission: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const user = req.user!;

        if (!user) {
            next(new ForbiddenError("User not authenticated"));
            return;
        }

        const permissions = await PermissionModel.chekPermissions(Number(user.id));

        const userPermissions = permissions.map((p) => p.permission);
        console.log(userPermissions);
        const hasPermission = userPermissions.includes(permission);

        // check if user has the required permission
        if (!hasPermission) {
            next(new ForbiddenError("Permissions required!"));
            return;
        }

        next();
    };
}
