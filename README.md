StayFit — Fitness & Wellness Platform

StayFit.pk is a modern fitness platform that allows users to explore workout programs, connect with certified trainers, and begin their fitness transformation.
It features a clean architecture with an optimized frontend–backend workflow for speed, scalability, and maintainability.


Live Deployments

| Service | URL |
|----------|-----|
| Frontend (Vercel) | https://stayfit.pk |
| Backend API (Render) | https://api.stayfit.pk |
| Database (Neon PostgreSQL) | https://neon.tech |
| Domain (Hostinger) | Managed via Hostinger DNS |

Tech Stack

Frontend
- React + Vite + TypeScript
- TailwindCSS for responsive styling
- React Router for navigation
- Deployed via Vercel

Backend
- Node.js + Express.js
- Prisma ORM with PostgreSQL
- JWT Authentication
- Deployed via Render

Database
- Neon.tech (PostgreSQL Cloud)
- SSL-enabled connection
- Prisma schema-based migrations


Project Structure

stayfit-pk-glow/
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── utils/
│   │   ├── index.ts
│   │   └── server.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── .env
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── sections/
│   │   ├── styles/
│   │   └── App.tsx
│   ├── public/
│   ├── vite.config.ts
│   ├── .env
│   └── package.json
│
├── database/
│   ├── migrations/
│   └── seed/
│
├── docs/
│   ├── setup-guide.md
│   └── screenshots/
│
├── .gitignore
├── .env.example
├── LICENSE
└── README.md

Setup & Installation

1. Clone the repository
git clone https://github.com/sultan9723/stayfit.git
cd stayfit

2. Install dependencies
cd backend && npm install
cd ../frontend && npm install

3. Configure environment variables
Copy .env.example into each folder:
cp .env.example backend/.env
cp .env.example frontend/.env

4. Run the backend
cd backend
npm run dev

5. Run the frontend
cd ../frontend
npm run dev

6. Access the app
Frontend: http://localhost:5173
Backend API: http://localhost:3001

------------------------------------------------------------
Database Setup (Neon PostgreSQL)

cd backend
npx prisma generate
npx prisma migrate deploy

Example database connection:
DATABASE_URL=postgresql://stayfit_user:<password>@ep-your-neon-host.ap-south-1.aws.neon.tech/stayfitdb?sslmode=require


Environment Variables

Frontend (.env)
VITE_API_URL=https://api.stayfit.pk
VITE_MODE=production

Backend (.env)
DATABASE_URL=postgresql://stayfit_user:<password>@ep-your-neon-host.ap-south-1.aws.neon.tech/stayfitdb?sslmode=require
PORT=3001
CORS_ORIGIN=https://stayfit.pk
JWT_SECRET=yourStrongSecretKey


Development Notes

- Code formatting via Prettier and ESLint
- Full TypeScript support for type safety
- Structured as a monorepo for clarity and modular development
- Compatible with CI/CD workflows for automated deployment


Author

Sultan Qaiser
Cybersecurity and IT Student, NUML
Email: sultan.malik9723@gmail.com
Website: https://stayfit.pk


License

This project is licensed under the MIT License.
You may use and modify it for personal or commercial purposes with proper credit.

