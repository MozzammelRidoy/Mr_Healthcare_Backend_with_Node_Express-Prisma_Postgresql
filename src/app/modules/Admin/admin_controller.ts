import { Request, Response } from "express";
import { AdminServices } from "./admin_service";

// fetch all admin.
const getAllAdmins = async (req: Request, res: Response) => {
  try {
    const result = await AdminServices.fetchAllAdminFromDB(req.query);
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
