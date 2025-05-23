import jwt, { Secret, SignOptions } from "jsonwebtoken";

export type TJwtPayload = {
  email: string;
  id: string;
  role: string;
};

const generateToken = (
  jwtPayload: TJwtPayload,
  jwtSecret: Secret,
  expiresIn: string
): string => {
  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions["expiresIn"],
    algorithm: "HS256",
  };
  return jwt.sign(jwtPayload, jwtSecret, options);
};

const verifyToken = (token: string, jwtSecret: Secret): TJwtPayload => {
  return jwt.verify(token, jwtSecret) as TJwtPayload;
};

export const JwtHelpers = {
  generateToken,
  verifyToken,
};
