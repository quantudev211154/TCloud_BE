"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.converFullUserToReturnUser = void 0;
const converFullUserToReturnUser = (user) => {
    return {
        id: user.id,
        fullName: user.fullName,
        avatar: user.avatar,
        phone: user.phone,
        createdAt: user.createdAt,
    };
};
exports.converFullUserToReturnUser = converFullUserToReturnUser;
