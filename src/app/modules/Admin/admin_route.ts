import express from "express";
import { AdminControllers } from "./admin_controller";

const router = express.Router();
router.get("/", AdminControllers.getAllAdmins);

export const AdminRoutes = router;
