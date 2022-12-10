"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJWTToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const createJWTToken = (type, user) => {
    return (0, jsonwebtoken_1.sign)(Object.assign({ userId: user.id }, (type === 'refreshToken' ? { tokenVersion: user.tokenVersion } : {})), type === 'accessToken'
        ? process.env.ACCESS_TOKEN_SECRET
        : process.env.REFRESH_TOKEN_SECRET, { expiresIn: type === 'accessToken' ? '15s' : '3d' });
};
exports.createJWTToken = createJWTToken;
