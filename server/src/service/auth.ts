import { User } from "../interface/user";
import { sign } from "jsonwebtoken";
import config from "../config";

// generate access and refresh tokens
export async function generateAccessRefreshToken(user: User) {
    // payload for the tokens
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        permissions: user.permissions,
    };

    // access token with a specific expiry time
    const accessToken = await sign(payload, config.jwt.secret!, {
        expiresIn: config.jwt.accessTokenExpiryMS,
    });

    // refresh token with a expiry time
    const refreshToken = await sign(payload, config.jwt.secret!, {
        expiresIn: config.jwt.refreshTokenExpiryMS,
    });

    return { accessToken, refreshToken };
}
