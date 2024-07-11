import { User } from "../interface/user";
import { sign } from "jsonwebtoken";
import config from "../config";

export async function generateAccessRefreshToken(user: User) {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        permissions: user.permissions,
    };

    const accessToken = await sign(payload, config.jwt.secret!, {
        expiresIn: config.jwt.accessTokenExpiryMS,
    });

    const refreshToken = await sign(payload, config.jwt.secret!, {
        expiresIn: config.jwt.refreshTokenExpiryMS,
    });

    return { accessToken, refreshToken };
}
