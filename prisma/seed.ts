import { PrismaClient } from "../src/generated/prisma/index.js";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Đang bắt đầu nạp 11.000 từ HSK vào Database...");
  
  try {
    const res = await fetch("https://raw.githubusercontent.com/drkameleon/complete-hsk-vocabulary/main/complete.json");
    if (!res.ok) throw new Error("Không thể tải dữ liệu từ GitHub");
    
    const data = await res.json() as any[];
    console.log(`✅ Đã tải xong ${data.length} từ. Đang đưa vào hệ thống...`);

    let count = 0;
    for (const item of data) {
      const hanzi = item.hanzi || item.simplified;
      if (!hanzi) continue;

      // FIX CHUẨN: Chuyển đổi level an toàn. Nếu không phải số, mặc định là HSK 1
      const level = parseInt(item.level) || 1;

      await prisma.hskWord.upsert({
        where: { 
          hanzi_level: { hanzi, level } 
        },
        update: {},
        create: {
          hanzi,
          pinyin: item.pinyin || "",
          definition_en: item.definition || "",
          level,
          audio_url: `https://raw.githubusercontent.com/hugolpz/audio-cmn/main/hsk/cmn-${hanzi}.mp3`,
        },
      });

      count++;
      if (count % 500 === 0) console.log(`🚀 Đã nạp: ${count}/11000 từ...`);
    }

    console.log(`🎉 THÀNH CÔNG RỰC RỠ! Bạn đã sở hữu ${count} từ vựng trong Database.`);
  } catch (error) {
    console.error("❌ Lỗi trong quá trình nạp:", error);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });