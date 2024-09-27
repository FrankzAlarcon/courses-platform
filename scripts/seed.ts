const { PrismaClient } = require('@prisma/client')

const database = new PrismaClient()

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Web Development" },
        { name: "Mobile Development" },
        { name: "Computer Science" },
        { name: "Fitness" },
        { name: "Photography" },
        { name: "Filming" },
        { name: "Engineering" }
      ]
    })
    console.log("Successfully seeded the database categories")
  } catch (error) {
    console.log("Error seeding the database categories", error)
  } finally {
    await database.$disconnect()
  }
}

main()