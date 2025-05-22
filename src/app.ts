import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import status from "http-status";
import globalErrorHandler from "./app/middleware/globalerrorhandler";
import notFound from "./app/middleware/notfound";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  res.send({ message: "Mr Healthcare server is running" });
});

app.use("/api/v1", router);

app.use(globalErrorHandler);

app.use(notFound);
export default app;
