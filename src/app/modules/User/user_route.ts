import express from "express";
import { UserControllers } from "./user_contoller";

const router = express.Router();

router.get("/", UserControllers.createAdmin);

export const UserRoutes = router;
