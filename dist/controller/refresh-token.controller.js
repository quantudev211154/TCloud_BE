"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAndSendRefreshToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const user_entity_1 = require("../entities/user.entity");
const convert_user_to_return_user_1 = require("../utils/convert-user-to-return-user");
const create_jwt_token_1 = require("../utils/create-jwt-token");
const send_jwt_refresh_token_1 = require("../utils/send-jwt-refresh-token");
const createAndSendRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies[process.env.TCLOUD_REFRESH_TOKEN_NAME];
    if (!refreshToken)
        return res.status(401).json({
            status: false,
            msg: 'Refresh token not found',
        });
    try {
        const decoded = (0, jsonwebtoken_1.verify)(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const existingUser = yield user_entity_1.User.findOneBy({ id: decoded.userId });
        if (!existingUser || existingUser.tokenVersion !== decoded.tokenVersion)
            return res.status(401).json({
                status: false,
                msg: 'Refresh token is not valid',
            });
        (0, send_jwt_refresh_token_1.sendJWTRefreshToken)(res, existingUser);
        return res.status(200).json({
            accessToken: (0, create_jwt_token_1.createJWTToken)('accessToken', existingUser),
            user: (0, convert_user_to_return_user_1.converFullUserToReturnUser)(existingUser),
        });
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            status: false,
            msg: 'Refresh token is not valid',
        });
    }
});
exports.createAndSendRefreshToken = createAndSendRefreshToken;
