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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminServices = void 0;
const prisma_1 = require("../../../../generated/prisma");
const admin_constant_1 = require("./admin_constant");
const paginationHelpars_1 = require("./../../../helpars/paginationHelpars");
const prisma_2 = __importDefault(require("../../shared/prisma"));
const fetchAllAdminFromDB = (query, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = query, filterData = __rest(query, ["searchTerm"]);
    const { limit, page, skip, sortBy, sortOrder } = paginationHelpars_1.PaginationHelpars.calculatePagination(options);
    const andConditions = [];
    //   if (query.searchTerm) {
    //     andConditions.push({
    //       OR: [
    //         {
    //           name: {
    //             contains: query.searchTerm,
    //             mode: "insensitive",
    //           },
    //         },
    //         {
    //           email: {
    //             contains: query.searchTerm,
    //             mode: "insensitive",
    //           },
    //         },
    //       ],
    //     });
    //   }
    if (query.searchTerm) {
        andConditions.push({
            OR: admin_constant_1.adminSearchAbleFileds.map((filed) => ({
                [filed]: {
                    contains: query.searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    andConditions.push({ isDeleted: false });
    const whereConditions = { AND: andConditions };
    //   console.dir(andConditions, { depth: "infinite" });
    const result = yield prisma_2.default.admin.findMany({
        where: whereConditions,
        // skip: Number(limit) * (Number(page) - 1),
        skip,
        // take: Number(limit),
        take: limit,
        // orderBy:
        //   sortBy && sortOrder
        //     ? {
        //         [sortBy]: sortOrder,
        //       }
        //     : {
        //         createdAt: "desc",
        //       },
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const totalData = yield prisma_2.default.admin.count({
        where: whereConditions,
    });
    return { meta: { page, limit, totalData }, data: result };
});
// fetch single data.
const fetchSingleAdmin_ByID_fromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_2.default.admin.findUnique({
        where: {
            id,
            isDeleted: false,
        },
    });
    return result;
});
// udpate data.
const updateAdminDataIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_2.default.admin.findUniqueOrThrow({
        where: { id, isDeleted: false },
    });
    const result = yield prisma_2.default.admin.update({
        where: { id },
        data: payload,
    });
    return result;
});
//delete data.
const deleteAdminDataByIDIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_2.default.admin.findUniqueOrThrow({ where: { id, isDeleted: false } });
    const result = yield prisma_2.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const adminData = yield transactionClient.admin.delete({ where: { id } });
        yield transactionClient.user.delete({
            where: { email: adminData.email },
        });
        return adminData;
    }));
    return result;
});
// admin soft delete into db.
const softDeleteAdminDataByIDIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_2.default.admin.findUniqueOrThrow({ where: { id, isDeleted: false } });
    const result = yield prisma_2.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const adminData = yield transactionClient.admin.update({
            where: { id },
            data: {
                isDeleted: true,
            },
        });
        yield transactionClient.user.update({
            where: { email: adminData.email },
            data: {
                status: prisma_1.UserStatus.DELETED,
            },
        });
        return adminData;
    }));
    return result;
});
exports.AdminServices = {
    fetchAllAdminFromDB,
    fetchSingleAdmin_ByID_fromDB,
    updateAdminDataIntoDB,
    deleteAdminDataByIDIntoDB,
    softDeleteAdminDataByIDIntoDB,
};
