import { PrismaClient } from "@prisma/client" // ✅ Đã sửa: Import từ thư viện gốc
import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"

// Lấy URL từ file .env
const connectionString = `${process.env.DATABASE_URL}`

// Khởi tạo connection pool và adapter
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

// Khai báo global để chống lỗi tràn bộ nhớ khi Next.js hot-reload
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Khởi tạo Prisma với Adapter
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma