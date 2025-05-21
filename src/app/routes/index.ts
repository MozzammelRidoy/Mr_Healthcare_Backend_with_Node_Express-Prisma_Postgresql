import express from "express";
import { UserRoutes } from "../modules/User/user_route";
import { AdminRoutes } from "../modules/Admin/admin_route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
