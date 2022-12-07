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
const hello_entity_1 = require("./entities/hello.entity");
class TCloudDataSource {
    constructor() {
        this.getDataSource = () => this.datasource;
        this.init = () => {
            this.datasource
                .initialize()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                console.log('NOTI: TCloud railway server is ready');
                const hello = new hello_entity_1.Hello();
                yield this.datasource.manager.save(hello);
            }))
                .catch((error) => {
                console.log(error);
            });
        };
        this.datasource = new typeorm_1.DataSource({
            type: 'postgres',
            synchronize: true,
            logging: false,
            entities: ['entities/*.ts'],
            url: 'postgresql://postgres:n0fP13RrPXiMPWJRYfT6@containers-us-west-133.railway.app:5572/railway',
        });
    }
}
const MyDataSource = new TCloudDataSource();
exports.default = MyDataSource;
