import { Request, Response } from "express";
import prisma from "../config/prisma";
import redis from "ioredis";
import { REDIS_DEF_EXP, REDIS_PORT, REDIS_SERVICE_NAME } from "../config/env";

// Create a Redis client
const client = new redis({
  host: String(REDIS_SERVICE_NAME),
  port: Number(String(REDIS_PORT)),
});

async function getDataFromDB() {
  try {
    const allCodeSubs = await prisma.codeSubs.findMany();
    console.log("All code submissions:", allCodeSubs);
    return allCodeSubs;
  } catch (error) {
    // console.error("Error fetching code submissions:", error);
    throw new Error("Error fetching code submissions");
  }
}

async function getSubs(req: Request, res: Response) {
  try {
    const cachedData = await client.get("subsData");
    if (cachedData) {
      // If data exists in the cache, return it
      res
        .status(200)
        .json({ msg: "success", lolo: "redis", data: JSON.parse(cachedData) });
    } else {
      let dataToCache;
      try {
        // If data is not in the cache, fetch it from the source
        dataToCache = await getDataFromDB();
      } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({ msg: "fail" });
      }
      await client.setex(
        "subsData",
        String(REDIS_DEF_EXP),
        JSON.stringify(dataToCache)
      );

      res.status(200).json({ msg: "success", lolo: "dir", data: dataToCache });
    }
  } catch (err) {
    let dataToCache = await getDataFromDB();
    res.status(200).json({ msg: "success", lolo: "fnr", data: dataToCache });
  }
}
export default getSubs;
