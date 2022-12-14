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
exports.checkExistingPhone = exports.logout = exports.register = exports.login = void 0;
const user_entity_1 = require("../entities/user.entity");
const argon2_1 = require("argon2");
const create_jwt_token_1 = require("../utils/create-jwt-token");
const send_jwt_refresh_token_1 = require("../utils/send-jwt-refresh-token");
const convert_user_to_return_user_1 = require("../utils/convert-user-to-return-user");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, password } = req.body;
    if (!phone || !password)
        return res.status(400).json({
            status: false,
            msg: 'Phone or password is missing',
        });
    const existingUser = yield user_entity_1.User.findOneBy({
        phone,
    });
    if (!existingUser)
        return res.status(404).json({
            status: false,
            msg: 'Phone or password is incorrect',
        });
    const verifyPassword = yield (0, argon2_1.verify)(existingUser.password, password);
    if (!verifyPassword)
        return res.status(400).json({
            status: false,
            msg: 'Phone or password is incorrect',
        });
    (0, send_jwt_refresh_token_1.sendJWTRefreshToken)(res, existingUser);
    return res.status(200).json({
        user: (0, convert_user_to_return_user_1.converFullUserToReturnUser)(existingUser),
        accessToken: (0, create_jwt_token_1.createJWTToken)('accessToken', existingUser),
    });
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, phone, password } = req.body;
    if (!fullName || !phone || !password)
        return res.status(400).json({
            status: false,
            msg: 'Fullname or phone or password is missing',
        });
    const existingUser = yield user_entity_1.User.findOneBy({
        phone,
    });
    if (existingUser)
        return res.status(400).json({
            status: false,
            msg: 'This phone has been used',
        });
    const hashedPassword = yield (0, argon2_1.hash)(password);
    const newUser = yield user_entity_1.User.create({
        fullName,
        phone,
        password: hashedPassword,
    }).save();
    return res.status(200).json({
        user: (0, convert_user_to_return_user_1.converFullUserToReturnUser)(newUser),
    });
});
exports.register = register;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return res.status(400).json({
            status: false,
            msg: 'Phone is missing',
        });
    const exisingUser = yield user_entity_1.User.findOneBy({
        id,
    });
    if (!exisingUser)
        return res.status(400).json({
            status: false,
            msg: 'User Id is incorrect',
        });
    exisingUser.tokenVersion = exisingUser.tokenVersion + 1;
    exisingUser.save();
    return res.status(200).json({
        status: true,
        msg: 'Logged out',
    });
});
exports.logout = logout;
const checkExistingPhone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone } = req.params;
    if (!phone)
        return res.status(400).json({
            status: false,
            msg: 'Phone is missing',
        });
    const existingUser = yield user_entity_1.User.findOneBy({
        phone,
    });
    if (existingUser)
        return res.status(400).json({
            status: false,
            msg: 'Phone is used by other user',
        });
    return res.status(200).json({
        msg: 'Phone is free to register',
    });
});
exports.checkExistingPhone = checkExistingPhone;
