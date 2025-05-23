"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/User/user_route");
const admin_route_1 = require("../modules/Admin/admin_route");
const auth_route_1 = require("../modules/Auth/auth_route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/user",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/admin",
        route: admin_route_1.AdminRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
