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
exports.AdminControllers = void 0;
const admin_service_1 = require("./admin_service");
const pick_1 = __importDefault(require("../../shared/pick"));
const admin_constant_1 = require("./admin_constant");
const sendResponse_1 = require("../../shared/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
// fetch all admin.
const getAllAdmins = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = (0, pick_1.default)(req.query, admin_constant_1.adminFilterableFields);
        const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
        const result = yield admin_service_1.AdminServices.fetchAllAdminFromDB(filters, options);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Admin fetched successfully",
            meta: result.meta,
            data: result.data,
        });
    }
    catch (err) {
        next(err);
    }
});
// get single admin.
const getSingleAdminByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield admin_service_1.AdminServices.fetchSingleAdmin_ByID_fromDB(id);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Admin fetched successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
// update admin.
const updateAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield admin_service_1.AdminServices.updateAdminDataIntoDB(id, req.body);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Admin updated successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
//delete admin.
const deleteAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield admin_service_1.AdminServices.deleteAdminDataByIDIntoDB(id);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Admin deleted successfully",
            data: result,
        });
    }
    catch (err) {
        // res.status(status.BAD_REQUEST).json({
        //   success: false,
        //   message: "Failed to delete admin",
        //   error: err,
        // });
        next(err);
    }
});
// export all controllers.
const softDeleteAdminDataByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield admin_service_1.AdminServices.softDeleteAdminDataByIDIntoDB(id);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Admin deleted successfully",
            data: result,
        });
    }
    catch (err) {
        // res.status(status.BAD_REQUEST).json({
        //   success: false,
        //   message: "Failed to delete admin",
        //   error: err,
        // });
        next(err);
    }
});
exports.AdminControllers = {
    getAllAdmins,
    getSingleAdminByID,
    updateAdmin,
    deleteAdmin,
    softDeleteAdminDataByID,
};
