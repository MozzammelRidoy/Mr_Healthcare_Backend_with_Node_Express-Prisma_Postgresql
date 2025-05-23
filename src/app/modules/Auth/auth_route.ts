import express from "express";
import { AuthControllers } from "./auth_controller";

const router = express.Router();

router.post("/login", AuthControllers.loginUser);
router.post("/refresh-token", AuthControllers.refreshToken);
export const AuthRoutes = router;
