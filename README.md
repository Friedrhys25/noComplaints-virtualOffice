# 🏢 VirtualOffice

A DevKada hackathon 2026 project that simulates a **virtual office environment** where teams can collaborate in rooms and automatically generate **AI meeting transcripts and summaries**.

---

## 🚀 Overview

This platform allows users to:
* Join or create an **office** (company, department, or startup)
* Navigate between **rooms** (per-employee, and dedicated meeting rooms)
* Join **sessions** when entering rooms
* Capture conversations as **meetings**
* Generate **AI transcripts and summaries** automatically

---

## ⚙️ Local Setup

To install:
```bash
cd frontend/my-app
npm install
```
> Always retrieve the latest `.env.local` file in `frontend/my-app/`.

To run:
```bash
npm run dev
```
> Then access the locally ran website in your friendly neighborhood `http://localhost:3000`!

---

## 🧱 Architecture

```
Frontend (Next.js)
        ↓
Backend (Python / FastAPI - WIP)
        ↓
Database (Supabase / PostgreSQL)
```

---

## 🛠 Tech Stack

**Frontend**
* Next.js (App Router)
* React
* Supabase JS client

**Backend**
* Python (FastAPI)
* Whisper (speech-to-text)
* LLM API (summarization)

**Database**
* Supabase (PostgreSQL)

**Auth**
* Supabase Auth
* Google OAuth supported

---

## 📁 Project Structure
```
root/
├── frontend/
│   └── my-app/  # Next.js app
├── backend/     # Python backend
├── .gitignore
└── README.md
```

---

## 🔐 Authentication

Handled via Supabase:

* Google OAuth 
* Traditional email/password 

---

## 🌿 Git Workflow

* `main` → production, deployed on Vercel
* `dev` → main working branch (GitHub default)
* `feature-name` → feature branches, pruned immediately upon merge to `dev`

---

## 👥 Team

* **Larra**: frontend, UI/UX
* **Rhys**: fullstack, UI/UX, deployment
* **Alwyn**: backend, call implementation
* **Cedric**: backend, database, auth, actions