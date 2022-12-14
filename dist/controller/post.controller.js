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
exports.deletePost = exports.addPost = exports.getAllPosts = void 0;
const post_status_1 = require("../entities/enums/post-status");
const post_entity_1 = require("../entities/post.entity");
const user_entity_1 = require("../entities/user.entity");
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, status } = req.params;
    if (!userId)
        return res.status(404).json({
            status: false,
            msg: 'User id is missing',
        });
    try {
        const posts = yield post_entity_1.Post.find({
            where: {
                user: {
                    id: userId,
                },
                status: !status ? post_status_1.PostStatusEnum.DEFAULT : status,
            },
            relations: {
                user: true,
            },
            select: {
                user: {
                    id: true,
                    fullName: true,
                    phone: true,
                    createdAt: true,
                },
            },
        });
        return res.status(200).json({
            posts,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            status: false,
            msg: 'UserId can be invalid',
        });
    }
});
exports.getAllPosts = getAllPosts;
const addPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fileName, fileUrl, type, userId, fileSize } = req.body;
    if (!fileName || !fileUrl || !type || !userId || !fileSize)
        return res.status(400).json({
            status: false,
            msg: 'One of neccesary params is missing',
        });
    const existingUser = yield user_entity_1.User.findOneBy({ id: userId });
    if (!existingUser)
        res.status(404).json({
            status: false,
            msg: 'Not found any user has this id',
        });
    const newPost = yield post_entity_1.Post.create({
        fileUrl,
        fileName,
        user: existingUser,
        type,
        fileSize,
    }).save();
    return res.status(200).json({
        newPost,
    });
});
exports.addPost = addPost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    if (!postId)
        return res.status(400).json({
            status: false,
            msg: 'One of neccesary params is missing',
        });
    try {
        const deletedPost = yield post_entity_1.Post.delete({
            id: postId,
        });
        res.status(200).json({
            deletedPost,
        });
    }
    catch (error) {
        return res.status(401).json({
            status: false,
            msg: 'UserId or postId can be invalid',
        });
    }
});
exports.deletePost = deletePost;
