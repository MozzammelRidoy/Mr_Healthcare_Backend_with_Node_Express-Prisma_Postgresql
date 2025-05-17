import { PrismaClient, UserRole } from "../../../../generated/prisma";
const prisma = new PrismaClient();

// create admin .
const createAdmin = async (payload: any) => {
  const userData = {
    email: payload.admin.email,
    password: payload.password,
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
