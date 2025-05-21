import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  res.send({ message: "Mr Healthcare server is running" });
});

app.use("/api/v1", router);

export default app;
