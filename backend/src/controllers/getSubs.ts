import { Request, Response } from "express";
import prisma from "../config/prisma";

async function getSubs(req: Request, res: Response) {
  try {
    const allCodeSubs = await prisma.codeSubs.findMany();
    console.log("All code submissions:", allCodeSubs);

    res.status(200).json({ msg: "success", data: allCodeSubs });
  } catch (error) {
    console.error("Error fetching code submissions:", error);
    res.status(500).json({ msg: "fail" });
  }
}
export default getSubs;
