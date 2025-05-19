import { Request, Response } from "express";
import { AdminServices } from "./admin_service";
import pick from "../../shared/pick";

// fetch all admin.
const getAllAdmins = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, [
      "searchTerm",
      "name",
      "email",
      "contactNumber",
    ]);
    const result = await AdminServices.fetchAllAdminFromDB(filters);
    res.status(200).json({
      success: true,
      message: "Admin fetched successfully",
      data: result,
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
