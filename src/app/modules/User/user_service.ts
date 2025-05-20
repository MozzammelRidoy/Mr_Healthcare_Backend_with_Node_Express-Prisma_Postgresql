import { UserRole } from "../../../../generated/prisma";
import bcrypt from "bcrypt";
import prisma from "../../shared/prisma";

// create admin .
const createAdmin = async (payload: any) => {
  const hashedPasword = await bcrypt.hash(payload.password, 12);
  // console.log(hashedPasword);
  const userData = {
    email: payload.admin.email,
    password: hashedPasword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const createUserData = await transactionClient.user.create({
      data: userData,
    });

    const createAdminData = await transactionClient.admin.create({
      data: payload.admin,
    });

    return createAdminData;
  });
  return result;
};

export const UserServices = {
  createAdmin,
};
