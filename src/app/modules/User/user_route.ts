import express from "express";
import { UserControllers } from "./user_contoller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/", auth("ADMIN", "SUPER_ADMIN"), UserControllers.createAdmin);

export const UserRoutes = router;
