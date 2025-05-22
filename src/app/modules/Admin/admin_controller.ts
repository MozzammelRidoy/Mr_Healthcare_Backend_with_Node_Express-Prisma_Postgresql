import { AdminServices } from "./admin_service";
import pick from "../../shared/pick";
import { adminFilterableFields } from "./admin_constant";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import catchAsync from "../../shared/catchAsync";

// fetch all admin.
const getAllAdmins = catchAsync(async (req, res) => {
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
});

// get single admin.
const getSingleAdminByID = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AdminServices.fetchSingleAdmin_ByID_fromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin fetched successfully",
    data: result,
  });
});

// update admin.
const updateAdmin = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AdminServices.updateAdminDataIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin updated successfully",
    data: result,
  });
});

//delete admin.
const deleteAdmin = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AdminServices.deleteAdminDataByIDIntoDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin deleted successfully",
    data: result,
  });

  // res.status(status.BAD_REQUEST).json({
  //   success: false,
  //   message: "Failed to delete admin",
  //   error: err,
  // });
});

// export all controllers.
const softDeleteAdminDataByID = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AdminServices.softDeleteAdminDataByIDIntoDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin deleted successfully",
    data: result,
  });

  // res.status(status.BAD_REQUEST).json({
  //   success: false,
  //   message: "Failed to delete admin",
  //   error: err,
  // });
});
export const AdminControllers = {
  getAllAdmins,
  getSingleAdminByID,
  updateAdmin,
  deleteAdmin,
  softDeleteAdminDataByID,
};
