import express from "express";
import { UserControllers } from "./user_contoller";

const router = express.Router();

router.post("/", UserControllers.createAdmin);

export const UserRoutes = router;
