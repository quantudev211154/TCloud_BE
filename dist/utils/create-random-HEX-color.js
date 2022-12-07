"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomHEXColor = void 0;
const createRandomHEXColor = () => '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
exports.createRandomHEXColor = createRandomHEXColor;
