import crypto from "crypto";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import langToId from "../config/lang";
import axios from "axios";
import { RAPID_API_HOST, RAPID_API_KEY, RAPID_API_URL } from "../config/env";
import { stderr } from "process";
const prisma = new PrismaClient();

async function StoreCode(req: Request, res: Response) {
  const { username, language, code, input } = req.body;
  const uid: string = crypto.randomBytes(16).toString("hex").substring(0, 6);
  console.log(uid);

  try {
    await prisma.codeSubs.create({
      data: {
        uid,
        username,
        language,
        code,
        input,
      },
    });
    res.status(201).json({ msg: "success" });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ msg: "fail" });
  }

  // judge0 output
  const formData = {
    language_id: langToId(language),
    // encode source code in base64
    source_code: btoa(code),
    stdin: btoa(input),
  };

  const options = {
    method: "POST",
    url: RAPID_API_URL,
    params: { base64_encoded: "true", fields: "*" },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Host": RAPID_API_HOST,
      "X-RapidAPI-Key": RAPID_API_KEY,
    },
    data: formData,
  };
  try {
    const { data } = await axios.request(options);
    console.log(data);
    data.token && checkStatus(uid, data.token);
  } catch (err) {
    console.log("err", err);
  }
}

async function checkStatus(uid: string, token: string) {
  const options = {
    method: "GET",
    url: RAPID_API_URL + "/" + token,
    params: { base64_encoded: "true", fields: "*" },
    headers: {
      "X-RapidAPI-Host": RAPID_API_HOST,
      "X-RapidAPI-Key": RAPID_API_KEY,
    },
  };
  try {
    let { data } = await axios.request(options);
    let statusId = data.status?.id;

    // Processed - we have a result
    if (statusId === 1 || statusId === 2) {
      // still processing
      setTimeout(() => {
        checkStatus(uid, token);
      }, 2000);
      return;
    } else {
      console.log("response.data", data);
      let output = null;
      if (data?.stdout != null) {
        output = atob(data.stdout);
      } else if (data?.stderr != null) {
        output = atob(data.stderr);
      }
      if (output) {
        storeOutput(uid, output);
      }
    }
  } catch (err) {
    console.log("err", err);
  }
}

async function storeOutput(uid: string, output: string) {
  try {
    const updatedCodeSub = await prisma.codeSubs.update({
      where: {
        uid: uid,
      },
      data: {
        output,
      },
    });
    console.log("Updated code submission:", updatedCodeSub);
  } catch (error) {
    console.error("Error updating code submission:", error);
  }
}

export default StoreCode;
