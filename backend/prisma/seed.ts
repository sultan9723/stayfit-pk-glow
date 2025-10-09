import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting StayFit.pk database seed...");

  // -----------------------------
  // 🏋  TRAINERS
  // -----------------------------
  const trainersData = [
    {
      name: "Salman Ahmad",
      specialization: "Strength & Body Building",
      bio: "Senior trainer with extensive experience in strength training, bodybuilding, and fitness transformations. Expert in helping clients achieve their fitness goals through personalized training programs.",
      rating: 4.9,
    },
    {
      name: "Ammar Asif",
      specialization: "Cardio & Nutrition",
      bio: "Senior trainer focused on holistic fitness combining strength training, cardio, and nutrition. Expert in weight loss, muscle building, and lifestyle transformation.",
      rating: 4.8,
    },
    {
      name: "Hassan Ali",
      specialization: "Mixed Martial Arts",
      bio: "Professional MMA instructor with extensive combat sports background. Trained in multiple disciplines and self-defense techniques.",
      rating: 4.7,
    },
    {
      name: "Sarah Khan",
      specialization: "Fitness Instructor",
      bio: "Certified yoga and fitness instructor specializing in flexibility, mobility, and stress management. Focused on improving overall health and balance.",
      rating: 4.9,
    },
    {
      name: "Alina Riaz",
      specialization: "Nutrition Coach",
      bio: "Expert nutritionist and health coach providing personalized diet plans and nutritional education for optimal health and performance.",
      rating: 4.8,
    },
    {
      name: "Ayesha Malik",
      specialization: "Group Fitness Instructor",
      bio: "Energetic group fitness instructor specializing in high-intensity workouts and circuit training. Creates fun and effective group training sessions.",
      rating: 4.7,
    },
  ];

  await prisma.trainer.createMany({ data: trainersData });
  console.log(`✅ Seeded ${trainersData.length} trainers`);

  // -----------------------------
  // 🧩 PROGRAMS
  // -----------------------------
  const programsData = [
    {
      name: "Strength & Body Building",
      description:
        "Build lean muscle mass and increase your strength with our comprehensive bodybuilding program designed for all levels.",
      durationWeeks: 12,
      price: 4000,
    },
    {
      name: "Cardio and Strength",
      description:
        "Combine cardiovascular fitness with strength training for a complete body transformation and improved endurance.",
      durationWeeks: 8,
      price: 5000,
    },
    {
      name: "Mixed Martial Arts",
      description:
        "Learn MMA techniques including striking, grappling, and self-defense with professional instructors.",
      durationWeeks: 20,
      price: 8000,
    },
    {
      name: "Diet and Nutrition",
      description:
        "Expert nutritional guidance and meal planning to optimize your fitness results and achieve your health goals.",
      durationWeeks: 4,
      price: 3000,
    },
    {
      name: "Crossfit",
      description:
        "Functional fitness training that combines weightlifting, cardio, and gymnastics for maximum strength and endurance.",
      durationWeeks: 10,
      price: 6000,
    },
    {
      name: "Training Services",
      description:
        "One-on-one personal training with certified trainers for personalized fitness goals and maximum results.",
      durationWeeks: 16,
      price: 20000,
    },
  ];

  await prisma.program.createMany({ data: programsData });
  console.log(`✅ Seeded ${programsData.length} programs`);

  // -----------------------------
  // 💰 PRICING PLANS
  // -----------------------------
  const plansData = [
    {
      planName: "Strength Training",
      description: "Strength training only, free weights access, and basic diet plan.",
      price: 4000,
      durationMonths: 1,
      isPopular: false,
    },
    {
      planName: "Cardio Only",
      description: "Cardio equipment access, running and cycling sessions, and basic diet plan.",
      price: 5000,
      durationMonths: 1,
      isPopular: false,
    },
    {
      planName: "Cardio + Strength",
      description: "Full gym access, cardio & strength training, comprehensive diet plan, and personal guidance.",
      price: 8000,
      durationMonths: 1,
      isPopular: true,
    },
    {
      planName: "Group Class (Strength)",
      description: "Group strength training, instructor-led sessions, and community training.",
      price: 6000,
      durationMonths: 1,
      isPopular: false,
    },
    {
      planName: "Group Class (Cardio + Strength)",
      description: "Cardio & strength classes, group coaching, and expert instruction.",
      price: 10000,
      durationMonths: 1,
      isPopular: false,
    },
    {
      planName: "Personal Training",
      description: "1-on-1 training, personalized programs, flexible scheduling, and complete diet plan.",
      price: 20000,
      durationMonths: 1,
      isPopular: true,
    },
  ];

  await prisma.pricingPlan.createMany({ data: plansData });
  console.log(`✅ Seeded ${plansData.length} pricing plans`);

  // -----------------------------
  // 📰 BLOGS (optional sample)
  // -----------------------------
  await prisma.blog.createMany({
    data: [
      {
        title: "10 Fitness Tips for a Healthier Life",
        content:
          "Consistency is the key to fitness success. Start small, stay dedicated, and focus on balanced nutrition.",
      },
      {
        title: "How Strength Training Boosts Your Metabolism",
        content:
          "Strength training helps your body burn calories even after workouts. Learn how to include it in your routine.",
      },
    ],
  });
  console.log("✅ Seeded 2 blogs");

  // -----------------------------
  // 👤 USERS (for testing)
  // -----------------------------
  const users = await prisma.user.createMany({
    data: [
      {
        name: "Test User",
        email: "testuser@stayfit.pk",
        password: "N/A",
        phone: "+923001234567",
      },
    ],
  });
  console.log(`✅ Seeded ${users.count} user(s)`);

  // -----------------------------
  // 📅 SAMPLE BOOKING
  // -----------------------------
  const sampleUser = await prisma.user.findFirst({ where: { email: "testuser@stayfit.pk" } });
  const samplePlan = await prisma.pricingPlan.findFirst({ where: { planName: "Cardio + Strength" } });

  if (sampleUser && samplePlan) {
    await prisma.booking.create({
      data: {
        userId: sampleUser.id,
        pricingPlanId: samplePlan.id,
        preferredDate: new Date(),
        preferredTime: "Morning",
        alternativeTime: "Evening",
      },
    });
    console.log("✅ Added sample booking");
  }

  // -----------------------------
  // ✉ CONTACT FORM & NEWSLETTER
  // -----------------------------
  await prisma.contactForm.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      subject: "Just saying hi",
      message: "Excited to join StayFit.pk!",
      phone: "+923001234567",
    },
  });

  await prisma.newsletter.create({
    data: {
      email: "subscriber@example.com",
    },
  });

  console.log("✅ Added 1 contact form and 1 newsletter entry");

  console.log("🎉 All data seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });