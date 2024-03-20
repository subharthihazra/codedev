import express, { Express, Request, Response } from "express";
import cors from "cors";
import { SERVER_PORT } from "./config/env";
import connectDB from "./db/connect";
import router from "./routes/router";

const app: Express = express();

// use CORS
app.use(
  cors({
    origin: [
      "https://codedev-learn.vercel.app/",
      "https://codedev-learn.vercel.app",
      "http://codedev-learn.vercel.app/",
      "http://codedev-learn.vercel.app",
    ],
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
