import redis from "ioredis";
import { REDIS_PORT, REDIS_SERVICE_NAME } from "../config/env";

// Create a Redis client

const client = new redis({
  host: REDIS_SERVICE_NAME as string,
  port: Number(REDIS_PORT),
});

export default client;
