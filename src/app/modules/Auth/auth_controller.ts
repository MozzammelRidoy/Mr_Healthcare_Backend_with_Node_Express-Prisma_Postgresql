import status from "http-status";
import catchAsync from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { AuthServices } from "./auth_service";

// user login
const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUserIntoDB(req.body);

  const { refreshToken, ...others } = result;
  res.cookie("refereshToken", refreshToken), { secure: false, httpOnly: true };
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User logged in successfully",
    data: others,
  });
});

export const AuthControllers = {
  loginUser,
};
