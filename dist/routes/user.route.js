"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const auth_1 = require("../middleware/auth");
const userRoute = (0, express_1.Router)();
userRoute.get('/:phone', auth_1.verifyToken, user_controller_1.findUserByPhone);
exports.default = userRoute;
