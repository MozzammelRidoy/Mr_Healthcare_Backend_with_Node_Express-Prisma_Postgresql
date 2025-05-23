import prisma from "../../shared/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JwtHelpers } from "../../../helpars/jwtHelpars";

// login user.
const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: { email: payload.email, status: "ACTIVE" },
  });

  const isCurrectPassword = await bcrypt.compare(
    payload.password,
    userData.password
  );
  if (!isCurrectPassword) {
    throw new Error("Password is incorrect");
  }

  const accessToken = JwtHelpers.generateToken(
    { email: userData.email, id: userData.id, role: userData.role },
    "abcdefg",
    "1d"
  );

  const refreshToken = JwtHelpers.generateToken(
    { email: userData.email, id: userData.id, role: userData.role },
    "abcdefgh",
    "1y"
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needsPasswordChange,
  };
};

export const AuthServices = {
  loginUserIntoDB,
};
