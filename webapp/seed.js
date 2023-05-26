import { PrismaClient } from "@prisma/client"
import { v4 as uuid } from "uuid"
const prisma = new PrismaClient()

async function main() {
  await prisma.config.upsert({
    where: { key: "JWT_SECRET" },
    create: { key: "JWT_SECRET", value: uuid() },
    update: {},
  })
  console.info("✅ Setup Config: JWT_SECRET")

  if (process.env.NODE_ENV === "development") {
    await prisma.job.upsert({
      where: { name: "Wikipedia/Random" },
      update: {},
      create: {
        name: "Wikipedia/Random",
        url: "https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnlimit=5",
        crontab: "0 0 9 * * *",
      },
    })
    console.info("✅ Created Job: Wikipedia/Random")
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
