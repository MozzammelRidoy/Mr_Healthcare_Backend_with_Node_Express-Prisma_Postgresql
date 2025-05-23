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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtHelpars_1 = require("../../../helpars/jwtHelpars");
// login user.
const loginUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: { email: payload.email, status: "ACTIVE" },
    });
    const isCurrectPassword = yield bcrypt_1.default.compare(payload.password, userData.password);
    if (!isCurrectPassword) {
        throw new Error("Password is incorrect");
    }
    const accessToken = jwtHelpars_1.JwtHelpers.generateToken({ email: userData.email, id: userData.id, role: userData.role }, "abcdefg", "1d");
    const refreshToken = jwtHelpars_1.JwtHelpers.generateToken({ email: userData.email, id: userData.id, role: userData.role }, "abcdefgh", "1y");
    return {
        accessToken,
        refreshToken,
        needPasswordChange: userData.needsPasswordChange,
    };
});
// refresh token.
const refreshTokenByAccessToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedToken;
    try {
        decodedToken = jwtHelpars_1.JwtHelpers.verifyToken(token, "abcdefgh");
    }
    catch (err) {
        throw new Error("You are not authorized");
    }
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: { email: decodedToken.email, status: "ACTIVE" },
    });
    const accessToken = jwtHelpars_1.JwtHelpers.generateToken({ email: userData.email, id: userData.id, role: userData.role }, "abcdefg", "1d");
    return {
        accessToken,
    };
});
exports.AuthServices = {
    loginUserIntoDB,
    refreshTokenByAccessToken,
};
