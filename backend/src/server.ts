import express, { Express, Request, Response } from "express";
import cors from "cors";
import { SERVER_PORT } from "./config/env";
import connectDB from "./db/connect";
import router from "./routes/router";

const app: Express = express();

// use CORS
app.use(
  cors({
    origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());
// parse cookie
// app.use(cookieParser());

// using router
app.use("/", router);

// ERROR middleware (must be in last)
// app.use(ErrorMiddleware);

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

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
