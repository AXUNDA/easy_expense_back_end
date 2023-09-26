import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index.routes";
import { errorHandler } from "./middlewares/errorHandler";
import { notFound } from "./middlewares/notFound";

import dotenv from "dotenv";
dotenv.config();

import connect from "./db";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/", routes);
app.use(errorHandler);
app.use(notFound);

app.listen(8080, async () => {
  await connect();
  console.log("listening");
});
