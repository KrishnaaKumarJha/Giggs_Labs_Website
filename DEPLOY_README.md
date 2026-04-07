# Giggs Labs — Deployment & Transition Guide (Hostinger Edition)

This document explains the current architecture, hosting environment, and the reasoning behind the transition from a Django backend to a **Next.js Monolith**.

## 🏗️ Current Architecture: The Next.js Monolith

The project has been entirely consolidated into a **Next.js Monolith** (located in the `frontend/` directory). All backend logic that previously resided in Django has been migrated to **Next.js API Routes**.

| Component | Technology | Role |
|---|---|---|
| **Hosting** | **Hostinger Business Plan** | Shared hosting with Node.js support. |
| **Monolith** | **Next.js 14/15** | Unified UI and API logic (Serverless-style). |
| **API Backend** | `/pages/api/*` | Integrated REST endpoints (Contact, Applications, Auth). |
| **Database** | **MySQL (Hostinger)** | Managed relational storage for dynamic content. |
| **Authentication** | **Integrated Token Auth** | Located in `/api/token.js`, tailored for Hostinger's env vars. |

---

## 🚀 Why we shifted from Django to Next.js Monolith

The project was transitioned away from a separate Django backend for the following reasons:
1.  **Hostinger Compatibility**: Hostinger's Business Plan is optimized for a unified Node.js environment. Running a separate Django process alongside Next.js on shared hosting is complex and resource-heavy.
2.  **Simplified Maintenance**: By moving logic into Next.js API routes, we eliminate the need for Cross-Origin Resource Sharing (CORS) complexity and simplify the build pipeline.
3.  **Cost Efficiency**: A single monolith fits perfectly within the resource limits of a standard Business Hosting plan.

---

## 🔄 Transition Details for Colleagues

If you worked on the **previous Django backend** (located in the `backend/` folder), please note the following:

### ⚠️ The `backend/` folder is now ARCHIVAL
The code in the `backend/` directory is the **"Old Backend"**. It contains the Django models and views that served the previous version of the site. While it remains in the repo for data reference, it is **NOT** used in the current production deployment.

### 📍 Where is the LIVE logic?
All production logic is now in the `frontend` folder:
-   **API Endpoints**: `frontend/pages/api/` (Check `token.js`, `jobs.js`, `services.js`).
-   **Database Utility**: `frontend/utils/db.js` handles all MySQL connections using `mysql2`.
-   **Secret Management**: Managed via `.env` in the root, specifically tailored for Hostinger.
-   **Auth Logic**: The `/api/token.js` now uses a simplified credential check (`ADMIN_USER` / `ADMIN_PASS`) to avoid JWT signature issues often found in shared hosting environments.

---

## 💾 Deployment on Hostinger

To deploy this monolith to your Hostinger Business Plan:

1.  **Build Locally**: Run `npm run build` in the `frontend` directory.
2.  **Upload**: Upload the `.next`, `public`, `package.json`, and `node_modules` folders to your Hostinger `public_html` (or the directory specified in your Node.js Selector).
3.  **Environment Variables**: Setup the following in the Hostinger Panel (or via `.env`):
    -   **Auth**: `ADMIN_USER`, `ADMIN_PASS`.
    -   **Database**: `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`.
    -   **Email**: `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD`, `EMAIL_RECEIVERS`.

---

## 🛠️ Key Reference Files
- `frontend/pages/api/token.js` — The new authentication logic.
- `frontend/utils/db.js` — Core database connection helper.
- `frontend/pages/api/posts.js` — The new blog/insights management.
- `frontend/data/posts.js` — Static data storage for high-performance reading.
