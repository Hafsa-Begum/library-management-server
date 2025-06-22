import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

console.log('DATABASE_URL:', process.env.DATABASE_URL); // 👈 check this

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required in .env file');
  }
  
  export default {
    port: Number(process.env.PORT) || 3000,
    database_url: process.env.DATABASE_URL,
  };