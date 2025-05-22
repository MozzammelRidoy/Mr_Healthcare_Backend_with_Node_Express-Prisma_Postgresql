import { UserServices } from "./user_service";
import catchAsync from "../../shared/catchAsync";

// crate admin.
const createAdmin = catchAsync(async (req, res) => {
  //   console.log(req.body);
  const result = await UserServices.createAdmin(req.body);
  res.status(200).json({
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});

export const UserControllers = {
  createAdmin,
};
