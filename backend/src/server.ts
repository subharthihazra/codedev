import express, { Express, Request, Response } from "express";
import cors from "cors";
import { CORS_WHITELIST, SERVER_PORT } from "./config/env";
import connectDB from "./db/connect";
import router from "./routes/router";

const app: Express = express();

// use CORS
app.use(
  cors({
    origin: (CORS_WHITELIST as string).split(","),
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

// using router
app.use("/", router);

const startServer = async () => {
  try {
    await connectDB();

    const port = String(SERVER_PORT) || 5000;
    app.listen(port, () => {
      console.log(`Server is listening on port ${port} ...`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
