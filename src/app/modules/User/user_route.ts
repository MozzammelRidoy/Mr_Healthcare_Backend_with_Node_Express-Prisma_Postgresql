import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "./user_contoller";
import { JwtHelpers } from "../../../helpars/jwtHelpars";
import config from "../../config";

const router = express.Router();

const auth = (...role: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new Error("You are not authorized");
      }
      const verifiedUser = JwtHelpers.verifyToken(
        token,
        config.jwt.access_token_secret as string
      );
      if (role.length && !role.includes(verifiedUser.role)) {
        throw new Error("You are not authorized");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
router.post("/", auth("ADMIN", "SUPER_ADMIN"), UserControllers.createAdmin);

export const UserRoutes = router;
