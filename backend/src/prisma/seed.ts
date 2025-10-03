import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create sample programs
  const programs = await Promise.all([
    prisma.program.create({
      data: {
        name: 'Weight Loss Program',
        description:
          'A comprehensive 12-week program designed to help you lose weight safely and effectively through a combination of cardio, strength training, and nutrition guidance.',
        durationWeeks: 12,
        price: 299.99,
      },
    }),
    prisma.program.create({
      data: {
        name: 'Muscle Building Program',
        description:
          'Build lean muscle mass with our intensive 16-week program featuring progressive strength training, proper nutrition, and recovery protocols.',
        durationWeeks: 16,
        price: 399.99,
      },
    }),
    prisma.program.create({
      data: {
        name: 'Cardio Fitness Program',
        description:
          'Improve your cardiovascular health and endurance with our 8-week cardio-focused program including HIIT, running, and cycling workouts.',
        durationWeeks: 8,
        price: 199.99,
      },
    }),
    prisma.program.create({
      data: {
        name: 'MMA Training Program',
        description:
          'Learn mixed martial arts techniques with our comprehensive 20-week program covering striking, grappling, and self-defense.',
        durationWeeks: 20,
        price: 499.99,
      },
    }),
  ]);

  console.log(`✅ Created ${programs.length} programs`);

  // Create sample trainers
  const trainers = await Promise.all([
    prisma.trainer.create({
      data: {
        name: 'Ahmed Khan',
        specialization: 'Weight Loss & Cardio',
        bio:
          'Ahmed is a certified personal trainer with 8 years of experience in weight loss and cardiovascular training. He specializes in helping clients achieve their fitness goals through sustainable lifestyle changes.',
      },
    }),
    prisma.trainer.create({
      data: {
        name: 'Sara Ahmed',
        specialization: 'Strength Training & Bodybuilding',
        bio:
          'Sara is a professional bodybuilder and strength training specialist. She has helped hundreds of clients build muscle mass and improve their overall strength.',
      },
    }),
    prisma.trainer.create({
      data: {
        name: 'Hassan Ali',
        specialization: 'MMA & Combat Sports',
        bio:
          'Hassan is a former MMA fighter and certified combat sports instructor. He brings 12 years of experience in martial arts and self-defense training.',
      },
    }),
    prisma.trainer.create({
      data: {
        name: 'Fatima Sheikh',
        specialization: 'Yoga & Flexibility',
        bio:
          'Fatima is a certified yoga instructor and flexibility specialist. She focuses on improving mobility, reducing stress, and enhancing overall well-being.',
      },
    }),
  ]);

  console.log(`✅ Created ${trainers.length} trainers`);

  console.log('🎉 Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
