import { NextFunction, Request, Response } from "express";
import { JwtHelpers } from "../../helpars/jwtHelpars";
import config from "../config";
import ApiError from "../errors/ApiError";
import status from "http-status";

const auth = (...role: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(status.UNAUTHORIZED, "You are not authorized");
      }
      const verifiedUser = JwtHelpers.verifyToken(
        token,
        config.jwt.access_token_secret as string
      );
      if (role.length && !role.includes(verifiedUser.role)) {
        throw new ApiError(status.FORBIDDEN, "Forbidden");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
