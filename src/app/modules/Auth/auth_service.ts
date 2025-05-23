import prisma from "../../shared/prisma";
import bcrypt from "bcrypt";

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

  //   console.log(isCurrectPassword);
};

export const AuthServices = {
  loginUserIntoDB,
};
