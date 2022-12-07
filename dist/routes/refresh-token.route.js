"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const refresh_token_controller_1 = require("../controller/refresh-token.controller");
const refreshTokenRoute = (0, express_1.Router)();
refreshTokenRoute.get('/refresh_token', refresh_token_controller_1.createAndSendRefreshToken);
