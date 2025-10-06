import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting StayFit.pk database seed...");

  // --- PROGRAMS ---
  const programsData = [
    {
      name: "Weight Loss Program",
      description:
        "A 12-week guided fitness program focused on fat loss, nutrition, and endurance.",
      durationWeeks: 12,
      price: 299.99,
    },
    {
      name: "Muscle Building Program",
      description:
        "A 16-week strength and hypertrophy program to build lean muscle mass.",
      durationWeeks: 16,
      price: 399.99,
    },
    {
      name: "Cardio Fitness Program",
      description:
        "An 8-week cardio-focused plan including HIIT, cycling, and stamina training.",
      durationWeeks: 8,
      price: 199.99,
    },
    {
      name: "MMA Training Program",
      description:
        "A 20-week MMA program covering striking, grappling, and combat techniques.",
      durationWeeks: 20,
      price: 499.99,
    },
  ];

  await prisma.program.createMany({ data: programsData, skipDuplicates: true });
  console.log(`✅ Seeded ${programsData.length} programs`);

  // --- TRAINERS ---
  const trainersData = [
    {
      name: "Ahmed Khan",
      specialization: "Weight Loss & Cardio",
      bio: "Certified trainer with 8 years of experience helping clients reach weight goals.",
      rating: 4.8,
    },
    {
      name: "Sara Ahmed",
      specialization: "Strength Training & Bodybuilding",
      bio: "Professional bodybuilder with expertise in strength and hypertrophy programs.",
      rating: 4.9,
    },
    {
      name: "Hassan Ali",
      specialization: "MMA & Combat Sports",
      bio: "Ex-MMA fighter with 12 years of coaching experience in combat sports.",
      rating: 4.7,
    },
    {
      name: "Fatima Sheikh",
      specialization: "Yoga & Flexibility",
      bio: "Certified yoga instructor focused on flexibility and holistic wellness.",
      rating: 4.9,
    },
  ];

  await prisma.trainer.createMany({ data: trainersData, skipDuplicates: true });
  console.log(`✅ Seeded ${trainersData.length} trainers`);

  // --- PRICING PLANS ---
  const plansData = [
    {
      planName: "Basic Plan",
      description: "Access to gym and group classes for 1 month.",
      price: 49.99,
      durationMonths: 1,
      isPopular: false,
    },
    {
      planName: "Pro Plan",
      description: "3-month plan with trainer access and premium classes.",
      price: 129.99,
      durationMonths: 3,
      isPopular: true,
    },
    {
      planName: "Annual Elite Plan",
      description: "Full-year access to all programs and 1-on-1 trainer sessions.",
      price: 449.99,
      durationMonths: 12,
      isPopular: true,
    },
  ];

  await prisma.pricingPlan.createMany({ data: plansData, skipDuplicates: true });
  console.log(`✅ Seeded ${plansData.length} pricing plans`);

  // --- BLOGS ---
  const blogsData = [
    {
      title: "Top 5 Tips for Sustainable Weight Loss",
      content:
        "Learn how to build healthy habits and lose weight sustainably through mindful nutrition and consistent workouts.",
    },
    {
      title: "Why Yoga Is the Secret to Long-Term Fitness",
      content:
        "Yoga helps with flexibility, balance, and stress reduction—essential components for a lasting fitness lifestyle.",
    },
  ];

  await prisma.blog.createMany({ data: blogsData, skipDuplicates: true });
  console.log(`✅ Seeded ${blogsData.length} blogs`);

  // --- USERS ---
  const usersData = [
    {
      name: "John Doe",
      email: "john@example.com",
      password: "N/A",
      phone: "+923001112233",
      role: "user",
    },
    {
      name: "Admin User",
      email: "admin@stayfit.pk",
      password: "N/A",
      phone: "+923004445566",
      role: "admin",
    },
  ];

  await prisma.user.createMany({ data: usersData, skipDuplicates: true });
  console.log(`✅ Seeded ${usersData.length} users`);

  // --- BOOKINGS ---
  const john = await prisma.user.findUnique({ where: { email: "john@example.com" } });
  const weightLoss = await prisma.program.findFirst({ where: { name: "Weight Loss Program" } });
  const trainerAhmed = await prisma.trainer.findFirst({ where: { name: "Ahmed Khan" } });

  if (john && weightLoss && trainerAhmed) {
    await prisma.booking.create({
      data: {
        userId: john.id,
        programId: weightLoss.id,
        trainerId: trainerAhmed.id,
        preferredDate: new Date(),
        preferredTime: "Morning",
        status: "confirmed",
      },
    });
    console.log("✅ Added 1 sample booking");
  }

  // --- CONTACT FORMS ---
  await prisma.contactForm.create({
    data: {
      name: "Ali Raza",
      email: "ali.raza@gmail.com",
      subject: "Inquiry about Annual Plan",
      message: "Hi, I’d like to know if I can get a student discount on the Annual Plan.",
      phone: "+923009998877",
    },
  });
  console.log("✅ Added 1 contact form entry");

  // --- ACTIVITY LOGS ---
  if (john) {
    await prisma.activityLog.create({
      data: {
        userId: john.id,
        action: "Booked Weight Loss Program with Ahmed Khan",
        ipAddress: "192.168.1.12",
        userAgent: "Mozilla/5.0 (Windows NT 10.0)",
      },
    });
    console.log("✅ Added 1 activity log");
  }

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