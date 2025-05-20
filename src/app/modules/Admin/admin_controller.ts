import { Request, Response } from "express";
import { AdminServices } from "./admin_service";
import pick from "../../shared/pick";
import { adminFilterableFields } from "./admin_constant";

// fetch all admin.
const getAllAdmins = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await AdminServices.fetchAllAdminFromDB(filters, options);
    res.status(200).json({
      success: true,
      message: "Admin fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch admin",
      error: err,
    });
  }
};

export const AdminControllers = {
  getAllAdmins,
};
