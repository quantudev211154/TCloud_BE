"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendJWTRefreshToken = void 0;
const create_jwt_token_1 = require("./create-jwt-token");
const sendJWTRefreshToken = (res, user) => {
    res.cookie(process.env.TCLOUD_REFRESH_TOKEN_NAME, (0, create_jwt_token_1.createJWTToken)('refreshToken', user)
    // {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'lax',
    // }
    );
    console.log('Cookie set');
};
exports.sendJWTRefreshToken = sendJWTRefreshToken;
