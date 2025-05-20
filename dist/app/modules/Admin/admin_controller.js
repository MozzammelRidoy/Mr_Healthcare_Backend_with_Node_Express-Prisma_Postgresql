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
// fetch all admin.
const getAllAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = (0, pick_1.default)(req.query, admin_constant_1.adminFilterableFields);
        const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
        const result = yield admin_service_1.AdminServices.fetchAllAdminFromDB(filters, options);
        res.status(200).json({
            success: true,
            message: "Admin fetched successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Failed to fetch admin",
            error: err,
        });
    }
});
exports.AdminControllers = {
    getAllAdmins,
};
