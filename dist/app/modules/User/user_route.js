"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_contoller_1 = require("./user_contoller");
const router = express_1.default.Router();
router.post("/", user_contoller_1.UserControllers.createAdmin);
exports.UserRoutes = router;
