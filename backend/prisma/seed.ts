import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Trainers
  await prisma.trainer.createMany({
    data: [
      { name: "Sarah Khan", specialization: "Yoga & Wellness", rating: 4.8 },
      { name: "Ali Malik", specialization: "Strength & Conditioning", rating: 4.7 }
    ]
  })

  // Programs
  await prisma.program.createMany({
    data: [
      { name: "Cardio Training", description: "Boost stamina and energy", price: 50, durationWeeks: 4 },
      { name: "Strength Training", description: "Build muscle and endurance", price: 70, durationWeeks: 6 },
      { name: "MMA & Combat Sports", description: "Learn MMA with certified coaches", price: 90, durationWeeks: 8 }
    ]
  })

  // Pricing Plans
  await prisma.pricingPlan.createMany({
    data: [
      { planName: "Basic Plan", description: "Basic monthly plan", price: 30, durationMonths: 1, isPopular: false },
      { planName: "Premium Plan", description: "Premium 3-month package", price: 70, durationMonths: 3, isPopular: true },
      { planName: "Annual Plan", description: "Full year plan with best value", price: 200, durationMonths: 12, isPopular: false }
    ]
  })

  // Blogs
  await prisma.blog.createMany({
    data: [
      { title: "5 Tips to Stay Fit", content: "Here are five practical tips to keep your body healthy and active..." },
      { title: "How Strength Training Improves Mental Health", content: "Strength training not only builds muscles but also reduces stress and improves mood." }
    ]
  })
}

main()
  .then(() => console.log("✅ Seed data inserted"))
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())
