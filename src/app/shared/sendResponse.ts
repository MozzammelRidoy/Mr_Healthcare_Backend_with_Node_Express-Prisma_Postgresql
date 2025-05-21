import { Response } from "express";

export const sendResponse = <T>(
  res: Response,
  data: {
    statusCode: number;
    success: boolean;
    message: string;
    meta?: { page: number; limit: number; totalData: number };
    data: T | null | undefined;
  }
) => {
  res.status(data.statusCode).json({
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    meta: data.meta || null || undefined,
    data: data.data || null || undefined,
  });
};
