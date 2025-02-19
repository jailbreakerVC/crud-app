# CRUD App with Next.js, Prisma, and NeonDB

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Neon](https://img.shields.io/badge/Neon%20DB-00B4F0?style=for-the-badge&logo=postgresql&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

A simple and efficient **CRUD (Create, Read, Update, Delete) application** built using **Next.js**, **Prisma**, and **Neon SQL database**, deployed on **Vercel**.

## Authors

- [@JailbreakerVC](https://www.github.com/jailbreakerVC)

Made for Company Assignment (Contactwise) by Vijit Chandna

## 🚀 Features

- Next.js for a seamless frontend and backend experience.
- Prisma as the ORM for efficient database operations.
- NeonDB as a scalable and serverless PostgreSQL database.
- Hosted on Vercel for quick deployment and performance.

## 🛠️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/JailbreakerVC/crud-app.git
cd crud-app
```

### 2️⃣ Install dependencies

```bash
npm install  # or yarn install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in the root directory and add:

```env
DATABASE_URL="your-neon-database-url"
NEXT_PUBLIC_API_BASE_URL="your-api-url"
```

### 4️⃣ Run Prisma Migrations

```bash
npx prisma migrate dev --name init
```

### 5️⃣ Start the development server

```bash
npm run dev  # or yarn dev
```

The app will be live at `http://localhost:3000`

## 📜 License

This project is licensed under the **MIT License**.

---

Made with ❤️ using Next.js, Prisma & NeonDB.
