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
exports.UserServices = void 0;
const prisma_1 = require("../../../../generated/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_2 = __importDefault(require("../../shared/prisma"));
// create admin .
const createAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPasword = yield bcrypt_1.default.hash(payload.password, 12);
    // console.log(hashedPasword);
    const userData = {
        email: payload.admin.email,
        password: hashedPasword,
        role: prisma_1.UserRole.ADMIN,
    };
    const result = yield prisma_2.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const createUserData = yield transactionClient.user.create({
            data: userData,
        });
        const createAdminData = yield transactionClient.admin.create({
            data: payload.admin,
        });
        return createAdminData;
    }));
    return result;
});
exports.UserServices = {
    createAdmin,
};
