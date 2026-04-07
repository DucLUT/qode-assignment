import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

const envFilePath = process.env.NODE_ENV === 'production' ? '.env' : '.env.local';
dotenv.config({ path: envFilePath });

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

cloudinary.config({
  cloud_name: requiredEnv('CLOUDINARY_CLOUD_NAME'),
  api_key: requiredEnv('CLOUDINARY_API_KEY'),
  api_secret: requiredEnv('CLOUDINARY_API_SECRET')
});

export default cloudinary;