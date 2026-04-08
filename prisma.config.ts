import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';
import path from 'path';

// Nạp biến môi trường từ file .env
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
  // Đây chính là phần Prisma 7 yêu cầu để chạy lệnh seed
  migrations: {
    seed: 'npx tsx prisma/seed.ts',
  },
});