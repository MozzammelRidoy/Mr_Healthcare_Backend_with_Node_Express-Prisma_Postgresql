import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

const fetchAllAdminFromDB = async (query: any) => {
  const result = await prisma.admin.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
      ],
    },
  });
  return result;
};

export const AdminServices = {
  fetchAllAdminFromDB,
};
