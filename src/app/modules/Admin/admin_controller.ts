import { NextFunction, Request, Response } from "express";
import { AdminServices } from "./admin_service";
import pick from "../../shared/pick";
import { adminFilterableFields } from "./admin_constant";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

// fetch all admin.
const getAllAdmins = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await AdminServices.fetchAllAdminFromDB(filters, options);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (err) {
    next(err);
  }
};

// get single admin.
const getSingleAdminByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await AdminServices.fetchSingleAdmin_ByID_fromDB(id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// update admin.
const updateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const result = await AdminServices.updateAdminDataIntoDB(id, req.body);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

//delete admin.
const deleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const result = await AdminServices.deleteAdminDataByIDIntoDB(id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin deleted successfully",
      data: result,
    });
  } catch (err) {
    // res.status(status.BAD_REQUEST).json({
    //   success: false,
    //   message: "Failed to delete admin",
    //   error: err,
    // });
    next(err);
  }
};

// export all controllers.
const softDeleteAdminDataByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await AdminServices.softDeleteAdminDataByIDIntoDB(id);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin deleted successfully",
      data: result,
    });
  } catch (err) {
    // res.status(status.BAD_REQUEST).json({
    //   success: false,
    //   message: "Failed to delete admin",
    //   error: err,
    // });
    next(err);
  }
};
export const AdminControllers = {
  getAllAdmins,
  getSingleAdminByID,
  updateAdmin,
  deleteAdmin,
  softDeleteAdminDataByID,
};
