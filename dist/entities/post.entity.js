"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const typeorm_1 = require("typeorm");
const post_status_1 = require("./enums/post-status");
const post_type_enum_1 = require("./enums/post-type.enum");
const user_entity_1 = require("./user.entity");
let Post = class Post extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Post.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.posts),
    __metadata("design:type", user_entity_1.User)
], Post.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_name' }),
    __metadata("design:type", String)
], Post.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_url' }),
    __metadata("design:type", String)
], Post.prototype, "fileUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_size' }),
    __metadata("design:type", String)
], Post.prototype, "fileSize", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Post.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_at', default: new Date().toISOString() }),
    __metadata("design:type", String)
], Post.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: post_status_1.PostStatusEnum.DEFAULT }),
    __metadata("design:type", String)
], Post.prototype, "status", void 0);
Post = __decorate([
    (0, typeorm_1.Entity)({ name: 'posts' })
], Post);
exports.Post = Post;
