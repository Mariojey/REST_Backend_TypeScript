import express, {type Express, type Request, type Response} from "express";
import { SERVER_HOST, SERVER_PORT } from "./secrets.js";
import rootRouter from "./routes/index.js";
import { errorMiddleware } from "./middlewares/errors.js";

const app = express();

app.use(express.json());

app.get("/",(req: Request, res: Response) => {
    res.send("Hello, World!");
})

app.use("/api", rootRouter);

app.use(errorMiddleware);

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on http://${SERVER_HOST}:${SERVER_PORT}`);
})