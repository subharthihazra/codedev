import { Express, Request, Response, Router } from "express";
import StoreCode from "../controllers/storeCode";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
router.post("/codesub", StoreCode);

export default router;
