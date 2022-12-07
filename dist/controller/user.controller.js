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
exports.findUserByPhone = void 0;
const user_entity_1 = require("../entities/user.entity");
const findUserByPhone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone } = req.params;
    if (!phone)
        return res.status(400).json({
            status: false,
            msg: 'Phone is missing',
        });
    const exisingUser = yield user_entity_1.User.findOneBy({
        phone,
    });
    if (!exisingUser)
        return res.status(404).json({
            status: false,
            msg: 'Not found any user has phone like this',
        });
    const returnPayload = {
        id: exisingUser.id,
        avatar: exisingUser.avatar,
        fullName: exisingUser.fullName,
        createdAt: exisingUser.createdAt,
        phone: exisingUser.phone,
    };
    return res.status(200).json({
        user: returnPayload,
    });
});
exports.findUserByPhone = findUserByPhone;
