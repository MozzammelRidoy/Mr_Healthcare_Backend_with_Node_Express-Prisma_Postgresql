import { Prisma, PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

const fetchAllAdminFromDB = async (query: any) => {
  const andConditions: Prisma.AdminWhereInput[] = [];

  if (query.searchTerm) {
    andConditions.push({
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
    });
  }

  const whereConditions: Prisma.AdminWhereInput = { AND: andConditions };
  console.dir(andConditions, { depth: "infinite" });

  const result = await prisma.admin.findMany({
    where: whereConditions,
  });
  return result;
};

export const AdminServices = {
  fetchAllAdminFromDB,
};
