"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const data_source_1 = __importDefault(require("./data-source"));
class TCloudExpressApp {
    constructor() {
        this.init = () => {
            new data_source_1.default().init();
        };
        this.getExpressApp = () => this.app;
        dotenv_1.default.config();
        this.app = (0, express_1.default)();
        this.app.use((0, cors_1.default)({
            origin: ['https://t-cloud-fe.vercel.app', 'http://localhost:5173'],
            credentials: true,
        }));
        this.app.use(express_1.default.json());
        this.app.use((0, cookie_parser_1.default)());
        console.log('NOTI: Express app has already');
    }
}
const MyExpressApp = new TCloudExpressApp();
exports.default = MyExpressApp;
