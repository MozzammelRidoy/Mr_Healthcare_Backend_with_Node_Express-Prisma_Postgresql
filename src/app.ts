import express, { Application, Request, Response, urlencoded } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/User/user_route";
import { AdminRoutes } from "./app/modules/Admin/admin_route";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  res.send({ message: "Mr Healthcare server is running" });
});

app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/admin", AdminRoutes);

export default app;
