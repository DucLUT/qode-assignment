import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: '.env.local' });

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