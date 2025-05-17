import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

const fetchAllAdminFromDB = async () => {
  const result = await prisma.admin.findMany();
  return result;
};

export const AdminServices = {
  fetchAllAdminFromDB,
};
