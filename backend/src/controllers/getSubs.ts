import { Request, Response } from "express";
import prisma from "../config/prisma";
import redis from "ioredis";
import { REDIS_DEF_EXP } from "../config/env";

// Create a Redis client
const client = redis.createClient();

async function getDataFromDB() {
  const allCodeSubs = await prisma.codeSubs.findMany();
  console.log("All code submissions:", allCodeSubs);
  return allCodeSubs;
}

async function getSubs(req: Request, res: Response) {
  try {
    const cachedData = await client.get("cachedData");
    if (cachedData) {
      // If data exists in the cache, return it
      res
        .status(200)
        .json({ msg: "success", data: JSON.parse(cachedData), lolo: 5 });
    } else {
      // If data is not in the cache, fetch it from the source
      const dataToCache = await getDataFromDB();
      await client.setex(
        "subsData",
        String(REDIS_DEF_EXP),
        JSON.stringify(dataToCache)
      );

      res.status(200).json({ msg: "success", data: dataToCache, gfui: 7 });
    }
  } catch (error) {
    console.error("Error fetching code submissions:", error);
    res.status(500).json({ msg: "fail" });
  }
}
export default getSubs;
