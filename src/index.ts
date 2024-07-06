import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { setupRouters } from "./routes/main";
import { ErrorHandler } from "./middlewares/errors";
import { connect } from "./database/connect";

import "dotenv/config";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static("../public"));

setupRouters(app);

app.use(ErrorHandler.notFound);

app.use(ErrorHandler.internalServerError);

async function startServer() {
  await connect();

  app.listen(Number(process.env.PORT), () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  });
}

startServer();