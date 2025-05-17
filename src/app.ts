import express, { Application, Request, Response, urlencoded } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/User/user_route";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  res.send({ message: "Mr Healthcare server is running" });
});

app.use("/api/v1/user", UserRoutes);

export default app;
