# Giggs Labs — Backend & Deployment Documentation (New Architecture)

> [!IMPORTANT]
> **Major Architecture Update**: This repository has successfully migrated from a standalone **Django** backend to a **Next.js API Routes** architecture. The `/backend` directory is now considered **LEGACY/DEPRECATED** and is kept for reference only. 

This guide explains the current deployment workflow and the new codebase structure for the benefit of both the admin and collaborating engineers.

---

## 🏗️ The New Architecture: Next.js + MySQL
The project now runs as a single unified application (Frontend + Backend) deployed on **Hostinger Shared Hosting**.

### 1. Unified Backend (Node.js)
Instead of a separate Django server, all API endpoints are now located within the Next.js project:
- **Location:** `frontend/pages/api/`
- **Stack:** Node.js (Next.js server-side), `mysql2` (Database pooling), `nodemailer` (Email alerts).

### 2. Database Migration (Postgres → MySQL)
- **Engine:** MySQL (Provided by Hostinger shared hosting).
- **Helper:** `frontend/utils/db.js` — manages the connection pool. 
- **Schema:** Managed via standard SQL imports (`backend/giggs_schema.sql` can be used for reference, but hPanel handles the live MySQL instance).

---

## 🚀 How to Run Locally

### 1. Frontend & Backend (Next.js)
You only need to run one service now:
```bash
cd frontend
npm run dev
```
Runs on `http://localhost:3000`. API calls to `/api/*` will automatically be handled by the Next.js server.

### 2. Environment Variables
Create or update `frontend/.env.local` with the following variables:
- `DB_HOST`: Hostinger DB host (usually `localhost` or an IP).
- `DB_USER`: Your MySQL username.
- `DB_PASS`: Your MySQL password.
- `DB_NAME`: Your MySQL database name.
- `NOTIFICATION_EMAIL`: Recipient for contact form alerts.
- `SMTP_PASS`: Gmail App Password if using Gmail for mailing.

---

## 📂 New Codebase Map

| Feature | New Location (Active) | Legacy Location (Deprecated) |
|---|---|---|
| **API Endpoints** | `frontend/pages/api/` | `backend/api/` |
| **Authentication** | `frontend/pages/api/token.js` | Django JWT (SimpleJWT) |
| **Email Logic** | `frontend/utils/mailer.js` | Django `send_mail` |
| **DB Models** | Handled via direct SQL in `api/` | `backend/api/models.py` |
| **Assets/Media** | `frontend/public/` | `backend/media/` |

---

## 🔐 Navigating the Admin Panel
The admin dashboard remains fully functional and now interacts with the new Next.js API.

- **Shortcut:** Press `Ctrl + Shift + A` on any page to jump to the login.
- **Login URL:** `http://localhost:3000/admin/login`
- **Dashboard Hub:** `frontend/pages/admin/dashboard.js`
- **Feature Pages:**
    - `jobs.js` — Career portal management.
    - `posts.js` — Blog and Insights editor.
    - `services.js` — Service offering updates.
    - `messages.js` — Real-time contact lead view.

---

## 🛳️ Deployment (Hostinger Shared Hosting)
This project is configured for Hostinger's Node.js platform:

1. **Build Step:** Root `npm run build` generates the optimized Next.js app.
2. **Server:** Hostinger points to the `frontend/server.js` or the default Next.js entry point.
3. **Mailing:** Uses `nodemailer` to trigger alerts. If Hostinger's internal SMTP is blocked, we use Gmail SMTP with an App Password.

> [!TIP]
> **Usefulness of `/backend`**: Your colleague should refer to `/backend/api/models.py` to understand the original data structure if they need to replicate any complex logic in the new Node.js environment, but **do not deploy** the contents of the `/backend` folder.
