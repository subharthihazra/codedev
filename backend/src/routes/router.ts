import { Express, Request, Response, Router } from "express";
import StoreCode from "../controllers/storeCode";
import getSubs from "../controllers/getSubs";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
router.post("/codesub", StoreCode);
router.get("/getsubs", getSubs);

export default router;
