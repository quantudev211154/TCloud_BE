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
const typeorm_1 = require("typeorm");
const post_entity_1 = require("../entities/post.entity");
const user_entity_1 = require("../entities/user.entity");
class MyDatasource {
    constructor() {
        this.getDataSource = () => this.datasource;
        this.init = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.datasource.initialize();
                console.log('NOTI: Datasource has already');
            }
            catch (error) {
                console.log(error);
            }
        });
        this.datasource = new typeorm_1.DataSource({
            type: 'postgres',
            url: process.env.DB_URL,
            synchronize: true,
            logging: false,
            entities: [user_entity_1.User, post_entity_1.Post],
            poolSize: 5,
        });
    }
}
exports.default = MyDatasource;
