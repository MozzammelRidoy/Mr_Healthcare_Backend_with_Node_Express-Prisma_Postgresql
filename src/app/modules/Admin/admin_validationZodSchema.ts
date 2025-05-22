import { z } from "zod";

const adminUpdateDataValidationZodScheam = z.object({
  body: z.object({
    name: z.string(),
    contactNumber: z.string(),
  }),
});

export const AdminValidation = {
  adminUpdateDataValidationZodScheam,
};
