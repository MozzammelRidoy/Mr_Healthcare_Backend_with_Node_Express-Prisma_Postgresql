"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtHelpers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (jwtPayload, jwtSecret, expiresIn) => {
    const options = {
        expiresIn: expiresIn,
        algorithm: "HS256",
    };
    return jsonwebtoken_1.default.sign(jwtPayload, jwtSecret, options);
};
const verifyToken = (token, jwtSecret) => {
    return jsonwebtoken_1.default.verify(token, jwtSecret);
};
exports.JwtHelpers = {
    generateToken,
    verifyToken,
};
