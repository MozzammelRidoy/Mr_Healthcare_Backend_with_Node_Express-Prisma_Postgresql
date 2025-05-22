import express, { NextFunction, Request, Response } from "express";
import { AdminControllers } from "./admin_controller";
import { AnyZodObject, z } from "zod";

const updateDataValidationZodScheam = z.object({
  body: z.object({
    name: z.string(),
    contactNumber: z.string(),
  }),
});

const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({ body: req.body });
      next();
    } catch (err) {
      next(err);
    }
  };
const router = express.Router();
router.get("/", AdminControllers.getAllAdmins);
router.get("/:id", AdminControllers.getSingleAdminByID);
router.patch(
  "/:id",
  validateRequest(updateDataValidationZodScheam),
  AdminControllers.updateAdmin
);
router.delete("/:id", AdminControllers.deleteAdmin);
router.delete("/soft/:id", AdminControllers.softDeleteAdminDataByID);

export const AdminRoutes = router;
