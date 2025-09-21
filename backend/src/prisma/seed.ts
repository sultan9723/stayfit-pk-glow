import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create sample programs
  const programs = await Promise.all([
    prisma.program.upsert({
      where: { id: 'program-1' },
      update: {},
      create: {
        id: 'program-1',
        name: 'Weight Loss Program',
        description: 'A comprehensive 12-week program designed to help you lose weight safely and effectively through a combination of cardio, strength training, and nutrition guidance.',
        duration: '12 weeks',
        price: 299.99,
      },
    }),
    prisma.program.upsert({
      where: { id: 'program-2' },
      update: {},
      create: {
        id: 'program-2',
        name: 'Muscle Building Program',
        description: 'Build lean muscle mass with our intensive 16-week program featuring progressive strength training, proper nutrition, and recovery protocols.',
        duration: '16 weeks',
        price: 399.99,
      },
    }),
    prisma.program.upsert({
      where: { id: 'program-3' },
      update: {},
      create: {
        id: 'program-3',
        name: 'Cardio Fitness Program',
        description: 'Improve your cardiovascular health and endurance with our 8-week cardio-focused program including HIIT, running, and cycling workouts.',
        duration: '8 weeks',
        price: 199.99,
      },
    }),
    prisma.program.upsert({
      where: { id: 'program-4' },
      update: {},
      create: {
        id: 'program-4',
        name: 'MMA Training Program',
        description: 'Learn mixed martial arts techniques with our comprehensive 20-week program covering striking, grappling, and self-defense.',
        duration: '20 weeks',
        price: 499.99,
      },
    }),
  ]);

  console.log(`✅ Created ${programs.length} programs`);

  // Create sample trainers
  const trainers = await Promise.all([
    prisma.trainer.upsert({
      where: { id: 'trainer-1' },
      update: {},
      create: {
        id: 'trainer-1',
        name: 'Ahmed Khan',
        email: 'ahmed.khan@stayfit.pk',
        phone: '+92-300-1234567',
        specialty: 'Weight Loss & Cardio',
        experience: 8,
        bio: 'Ahmed is a certified personal trainer with 8 years of experience in weight loss and cardiovascular training. He specializes in helping clients achieve their fitness goals through sustainable lifestyle changes.',
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=face',
      },
    }),
    prisma.trainer.upsert({
      where: { id: 'trainer-2' },
      update: {},
      create: {
        id: 'trainer-2',
        name: 'Sara Ahmed',
        email: 'sara.ahmed@stayfit.pk',
        phone: '+92-301-2345678',
        specialty: 'Strength Training & Bodybuilding',
        experience: 6,
        bio: 'Sara is a professional bodybuilder and strength training specialist. She has helped hundreds of clients build muscle mass and improve their overall strength.',
        imageUrl: 'https://images.unsplash.com/photo-1594824388852-8a0b1b0b0b0b?w=400&h=400&fit=crop&crop=face',
      },
    }),
    prisma.trainer.upsert({
      where: { id: 'trainer-3' },
      update: {},
      create: {
        id: 'trainer-3',
        name: 'Hassan Ali',
        email: 'hassan.ali@stayfit.pk',
        phone: '+92-302-3456789',
        specialty: 'MMA & Combat Sports',
        experience: 12,
        bio: 'Hassan is a former MMA fighter and certified combat sports instructor. He brings 12 years of experience in martial arts and self-defense training.',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      },
    }),
    prisma.trainer.upsert({
      where: { id: 'trainer-4' },
      update: {},
      create: {
        id: 'trainer-4',
        name: 'Fatima Sheikh',
        email: 'fatima.sheikh@stayfit.pk',
        phone: '+92-303-4567890',
        specialty: 'Yoga & Flexibility',
        experience: 5,
        bio: 'Fatima is a certified yoga instructor and flexibility specialist. She focuses on improving mobility, reducing stress, and enhancing overall well-being.',
        imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
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
