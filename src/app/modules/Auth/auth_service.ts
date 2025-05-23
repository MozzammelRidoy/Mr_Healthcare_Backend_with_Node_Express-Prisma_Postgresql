import prisma from "../../shared/prisma";
import bcrypt from "bcrypt";
import { JwtHelpers } from "../../../helpars/jwtHelpars";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
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

// refresh token.
const refreshTokenByAccessToken = async (token: string) => {
  let decodedToken: JwtPayload;

  try {
    decodedToken = jwt.verify(token, "abcdefgh") as JwtPayload;
  } catch (err) {
    throw new Error("You are not authorized");
  }
  const userData = await prisma.user.findUniqueOrThrow({
    where: { email: decodedToken.email },
  });

  const accessToken = JwtHelpers.generateToken(
    { email: userData.email, id: userData.id, role: userData.role },
    "abcdefg",
    "1d"
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUserIntoDB,
  refreshTokenByAccessToken,
};
