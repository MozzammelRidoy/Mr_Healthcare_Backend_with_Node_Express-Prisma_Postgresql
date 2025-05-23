import prisma from "../../shared/prisma";
import bcrypt from "bcrypt";
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

  const accessToken = jwt.sign(
    { email: userData.email, id: userData.id, role: userData.role },
    "abcdefg",
    {
      expiresIn: "1d",
      algorithm: "HS256",
    }
  );

  const refreshToken = jwt.sign(
    { email: userData.email, id: userData.id, role: userData.role },
    "abcdefgh",
    {
      expiresIn: "30d",
      algorithm: "HS256",
    }
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
