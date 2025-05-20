import { Prisma, PrismaClient } from "../../../../generated/prisma";
import { adminSearchAbleFileds } from "./admin_constant";

const prisma = new PrismaClient();

const fetchAllAdminFromDB = async (query: any, options: any) => {
  const { searchTerm, ...filterData } = query;
  const { limit, page } = options;
  const andConditions: Prisma.AdminWhereInput[] = [];

  //   if (query.searchTerm) {
  //     andConditions.push({
  //       OR: [
  //         {
  //           name: {
  //             contains: query.searchTerm,
  //             mode: "insensitive",
  //           },
  //         },
  //         {
  //           email: {
  //             contains: query.searchTerm,
  //             mode: "insensitive",
  //           },
  //         },
  //       ],
  //     });
  //   }

  if (query.searchTerm) {
    andConditions.push({
      OR: adminSearchAbleFileds.map((filed) => ({
        [filed]: {
          contains: query.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.AdminWhereInput = { AND: andConditions };
  //   console.dir(andConditions, { depth: "infinite" });

  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip: Number(limit) * (Number(page) - 1),
    take: Number(limit),
  });
  return result;
};

export const AdminServices = {
  fetchAllAdminFromDB,
};
