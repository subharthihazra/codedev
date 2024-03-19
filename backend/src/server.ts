import express, { Express, Request, Response } from "express";
import cors from "cors";
import { SERVER_PORT } from "./config/env";
import connectDB from "./db/connect";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const app: Express = express();
const prisma = new PrismaClient();

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

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
  main();
});

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

async function main() {
  const uid: string = crypto.randomBytes(16).toString("hex").substring(0, 6);
  console.log(uid);
  //... you will write your Prisma Client queries here
  // await prisma.codeSubs.create({
  //   data: {
  //     uid: uid,
  //     username: "spidermanxx4",
  //     language: "python",
  //     code: `print("Hello Guys")`,
  //     input: `4`,
  //     output: `10`,
  //   },
  // });
}

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
