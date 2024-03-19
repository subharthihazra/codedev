import { Express, Router } from "express";
import StoreCode from "./controllers/storeCode";

const router = Router();

router.post("/codesub", StoreCode);

export default router;
