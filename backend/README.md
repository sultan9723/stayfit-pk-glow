# StayFit Backend API

A robust Node.js + Express + TypeScript backend for the StayFit.pk fitness platform.

## 🚀 Features

- **Contact Form API** - Handle contact form submissions
- **Program Booking API** - Manage fitness program bookings
- **Trainer Booking API** - Book personal training sessions
- **Database Integration** - Prisma ORM with SQLite (dev) / PostgreSQL (prod)
- **Input Validation** - Zod schema validation
- **Security** - CORS, Helmet, Rate limiting
- **TypeScript** - Full type safety

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Setup environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration.

3. **Initialize database:**
   ```bash
   npm run prisma:migrate
   npm run prisma:generate
   ```

4. **Seed database (optional):**
   ```bash
   npm run prisma:seed
   ```

## 🏃‍♂️ Running the Application

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

## 📊 API Endpoints

### Health Check
- `GET /ping` - Server health check

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact submissions (admin)

### Bookings
- `POST /api/book` - Submit program booking
- `GET /api/book` - Get all bookings (admin)
- `GET /api/book/programs` - Get available programs

### Trainers
- `GET /api/trainers` - Get all trainers
- `GET /api/trainers/:id` - Get specific trainer
- `POST /api/trainers/book` - Book trainer session
- `GET /api/trainers/bookings` - Get all trainer bookings (admin)
- `POST /api/trainers` - Create new trainer (admin)

## 🗄️ Database Schema

### Models
- **Contact** - Contact form submissions
- **Booking** - Program bookings
- **TrainerBooking** - Personal training sessions
- **Trainer** - Trainer profiles
- **Program** - Fitness programs

## 🔧 Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:studio` - Open Prisma Studio
- `npm run prisma:seed` - Seed database with sample data

## 🛡️ Security Features

- **CORS** - Cross-origin resource sharing
- **Helmet** - Security headers
- **Rate Limiting** - Prevent abuse
- **Input Validation** - Zod schema validation
- **Error Handling** - Comprehensive error management

## 🌍 Environment Variables

```env
# Database
DATABASE_URL="file:./dev.db"

# Server
PORT=3001
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 📝 API Request Examples

### Contact Form
```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Inquiry",
    "message": "I would like to know more about your programs."
  }'
```

### Program Booking
```bash
curl -X POST http://localhost:3001/api/book \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+92-300-1234567",
    "programId": "program-1",
    "programName": "Weight Loss Program",
    "preferredTime": "Morning"
  }'
```

### Trainer Booking
```bash
curl -X POST http://localhost:3001/api/trainers/book \
  -H "Content-Type: application/json" \
  -d '{
    "trainerId": "trainer-1",
    "trainerName": "Ahmed Khan",
    "name": "Mike Johnson",
    "email": "mike@example.com",
    "phone": "+92-300-9876543",
    "sessionDate": "2024-01-15T10:00:00Z",
    "preferredTime": "10:00 AM"
  }'
```

## 🚀 Deployment

### Production Database
For production, update the `DATABASE_URL` in your environment to use PostgreSQL or MySQL:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/stayfit_db"
```

### Deployment Platforms
- **Render** - Easy deployment with automatic builds
- **Railway** - Modern deployment platform
- **Heroku** - Traditional PaaS
- **VPS** - Self-hosted on DigitalOcean, AWS, etc.

## 📚 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** SQLite (dev) / PostgreSQL (prod)
- **ORM:** Prisma
- **Validation:** Zod
- **Security:** Helmet, CORS, Rate Limiting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.
