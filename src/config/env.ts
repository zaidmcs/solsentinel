import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  COLOSSEUM_API_KEY: process.env.COLOSSEUM_API_KEY,
  NODE_ENV: process.env.NODE_ENV || "development",
};

if (!ENV.COLOSSEUM_API_KEY) {
  throw new Error("Missing COLOSSEUM_API_KEY in environment");
}
