import express from "express";
import { AdminControllers } from "./admin_controller";

const router = express.Router();
router.get("/", AdminControllers.getAllAdmins);
router.get("/:id", AdminControllers.getSingleAdminByID);
router.patch("/:id", AdminControllers.updateAdmin);

export const AdminRoutes = router;
