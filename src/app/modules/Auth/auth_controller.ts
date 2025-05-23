import status from "http-status";
import catchAsync from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { AuthServices } from "./auth_service";

// user login
const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUserIntoDB(req.body);

  const { refreshToken, ...others } = result;
  res.cookie("refreshToken", refreshToken), { secure: false, httpOnly: true };
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User logged in successfully",
    data: others,
  });
});

// user refresh token.
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshTokenByAccessToken(refreshToken);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User Access token created successfully",
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  refreshToken,
};
