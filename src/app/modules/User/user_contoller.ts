import { Request, Response } from "express";
import { UserServices } from "./user_service";

// crate admin.
const createAdmin = async (req: Request, res: Response) => {
  try {
    //   console.log(req.body);
    const result = await UserServices.createAdmin(req.body);
    res.status(200).json({
      success: true,
      message: "Admin created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err?.name || "something went wrong",
      error: err,
    });
  }
};

export const UserControllers = {
  createAdmin,
};
