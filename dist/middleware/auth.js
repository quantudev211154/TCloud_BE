"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({
            noti: 'Auth token not found',
        });
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.ACCESS_TOKEN_SECRET);
        req.body.userId = decoded.userId;
        return next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            noti: 'Auth token is not valid',
        });
    }
};
exports.verifyToken = verifyToken;
