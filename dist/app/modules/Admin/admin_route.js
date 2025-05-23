"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin_controller");
const validateRequiest_1 = __importDefault(require("../../middleware/validateRequiest"));
const admin_validationZodSchema_1 = require("./admin_validationZodSchema");
const router = express_1.default.Router();
router.get("/", admin_controller_1.AdminControllers.getAllAdmins);
router.get("/:id", admin_controller_1.AdminControllers.getSingleAdminByID);
router.patch("/:id", (0, validateRequiest_1.default)(admin_validationZodSchema_1.AdminValidation.adminUpdateDataValidationZodScheam), admin_controller_1.AdminControllers.updateAdmin);
router.delete("/:id", admin_controller_1.AdminControllers.deleteAdmin);
router.delete("/soft/:id", admin_controller_1.AdminControllers.softDeleteAdminDataByID);
exports.AdminRoutes = router;
