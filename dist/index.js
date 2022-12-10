"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_app_1 = __importDefault(require("./class/express-app"));
const api_constant_1 = require("./constants/api.constant");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const post_route_1 = __importDefault(require("./routes/post.route"));
const refresh_token_route_1 = __importDefault(require("./routes/refresh-token.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
express_app_1.default.init();
const app = express_app_1.default.getExpressApp();
const PORT = process.env.PORT || 8000;
app.use(`${api_constant_1.DEFAULT_API}`, auth_route_1.default);
app.use(`${api_constant_1.DEFAULT_API}`, refresh_token_route_1.default);
app.use(`${api_constant_1.DEFAULT_API}/user`, user_route_1.default);
app.use(`${api_constant_1.DEFAULT_API}/posts`, post_route_1.default);
app.listen(PORT, () => {
    console.log(`NOTI: TCloud server is running on http://localhost:${PORT}`);
});
