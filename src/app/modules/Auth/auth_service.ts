import prisma from "../../shared/prisma";
import bcrypt from "bcrypt";
import { JwtHelpers } from "../../../helpars/jwtHelpars";
import { JwtPayload } from "jsonwebtoken";
import config from "../../config";
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
    config.jwt.access_token_secret as string,
    config.jwt.access_token_expires_in as string
  );

  const refreshToken = JwtHelpers.generateToken(
    { email: userData.email, id: userData.id, role: userData.role },
    config.jwt.refresh_token_secret as string,
    config.jwt.refresh_token_expires_in as string
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
    decodedToken = JwtHelpers.verifyToken(token, "abcdefgh");
  } catch (err) {
    throw new Error("You are not authorized");
  }
  const userData = await prisma.user.findUniqueOrThrow({
    where: { email: decodedToken.email, status: "ACTIVE" },
  });

  const accessToken = JwtHelpers.generateToken(
    { email: userData.email, id: userData.id, role: userData.role },
    config.jwt.access_token_secret as string,
    config.jwt.access_token_expires_in as string
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUserIntoDB,
  refreshTokenByAccessToken,
};
