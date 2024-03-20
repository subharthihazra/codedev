import dotenv from "dotenv";
dotenv.config();

export const {
  SERVER_PORT,
  MONGO_URI,
  JWT_SECRET_KEY,
  RAPID_API_HOST,
  RAPID_API_KEY,
  RAPID_API_URL,
  REDIS_DEF_EXP,
  REDIS_SERVICE_NAME,
  REDIS_PORT,
} = process.env;
