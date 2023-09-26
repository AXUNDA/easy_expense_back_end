import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index.routes";
import { errorHandler } from "./middlewares/errorHandler";
import { notFound } from "./middlewares/notFound";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use("/", routes);
app.use(errorHandler);
app.use(notFound);

app.listen(8080, () => {
  console.log("listening");
});
