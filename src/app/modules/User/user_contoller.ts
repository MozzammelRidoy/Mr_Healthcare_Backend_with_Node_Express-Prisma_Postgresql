import { Request, Response } from "express";
import { UserServices } from "./user_service";

// crate admin.
const createAdmin = async (req: Request, res: Response) => {
  console.log(req.body);
  const result = await UserServices.createAdmin();
  res.send(result);
};

export const UserControllers = {
  createAdmin,
};
