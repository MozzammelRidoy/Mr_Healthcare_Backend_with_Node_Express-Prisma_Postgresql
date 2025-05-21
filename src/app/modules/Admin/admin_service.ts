import { Admin, Prisma } from "../../../../generated/prisma";
import { adminSearchAbleFileds } from "./admin_constant";
import { PaginationHelpars } from "./../../../helpars/paginationHelpars";
import prisma from "../../shared/prisma";

const fetchAllAdminFromDB = async (query: any, options: any) => {
  const { searchTerm, ...filterData } = query;
  const { limit, page, skip, sortBy, sortOrder } =
    PaginationHelpars.calculatePagination(options);
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
    // skip: Number(limit) * (Number(page) - 1),
    skip,
    // take: Number(limit),
    take: limit,

    // orderBy:
    //   sortBy && sortOrder
    //     ? {
    //         [sortBy]: sortOrder,
    //       }
    //     : {
    //         createdAt: "desc",
    //       },
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  const totalData = await prisma.admin.count({
    where: whereConditions,
  });
  return { meta: { page, limit, totalData }, data: result };
};

// fetch single data.
const fetchSingleAdmin_ByID_fromDB = async (id: string) => {
  const result = await prisma.admin.findUnique({
    where: {
      id,
    },
  });

  return result;
};

// udpate data.
const updateAdminDataIntoDB = async (id: string, payload: Partial<Admin>) => {
  await prisma.admin.findUniqueOrThrow({
    where: { id },
  });

  const result = await prisma.admin.update({
    where: { id },
    data: payload,
  });

  return result;
};

//delete data.
const deleteAdminDataByIDIntoDB = async (id: string) => {
  await prisma.admin.findUniqueOrThrow({ where: { id } });

  const result = await prisma.$transaction(async (transactionClient) => {
    const adminData = await transactionClient.admin.delete({ where: { id } });

    await transactionClient.user.delete({
      where: { email: adminData.email },
    });

    return adminData;
  });

  return result;
};
export const AdminServices = {
  fetchAllAdminFromDB,
  fetchSingleAdmin_ByID_fromDB,
  updateAdminDataIntoDB,
  deleteAdminDataByIDIntoDB,
};
