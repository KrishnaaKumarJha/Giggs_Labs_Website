# Giggs Labs — Admin Guide

## 🔐 Accessing the Admin Dashboard

The admin panel is hidden behind a secret URL key. Normal visitors cannot find it.

**Admin Login URL:**
```
http://localhost:3000/admin/login?key=giggs2026secure
```

> Bookmark this URL. Without the `?key=giggs2026secure` parameter, the page returns a 404.

After logging in, you'll land on the **Admin Dashboard** with access to:
- **Job Openings** — Create, edit, delete job listings (shown on Careers page)
- **Services** — Create, edit, delete service offerings (shown on Services page)
- **Insights / Blog** — Create, edit, delete blog posts with markdown, images, and publish toggle
- **Applications** — View job applications (read-only)
- **Messages** — View contact form messages (read-only)

---

## 🔑 Changing the Secret URL Key

Edit `frontend/.env.local` and change the value:
```
ADMIN_SECRET_KEY=your_new_secret_key_here
```
Then **restart the Next.js dev server** for changes to take effect:
```
cd frontend
npm run dev
```

---

## 👤 Admin User Management

All commands run from the `backend/` directory using the project's virtual environment.

### List all admin users
```
..python manage.py shell -c "from django.contrib.auth.models import User; [print(f'Username: {u.username}, Email: {u.email}') for u in User.objects.filter(is_staff=True)]"
```

> **Note:** Passwords are never visible — Django stores them as secure hashes.

### Create a new admin user
```
..python manage.py createsuperuser
```
You'll be prompted for username, email, and password.

### Change an admin's password
```
..python manage.py changepassword <username>
```
You'll be prompted to enter the new password twice. No need to know the old password.

### Delete an admin user
```
..python manage.py shell
```
Then in the Python shell:
```python
from django.contrib.auth.models import User
User.objects.get(username='the_username').delete()
exit()
```

---

## 🚀 Running the Project

### Backend (Django)
```
cd backend
..\.venv\Scripts\python.exe manage.py runserver
```
Runs on `http://127.0.0.1:8000`

### Frontend (Next.js)
```
cd frontend
npm run dev
```
Runs on `http://localhost:3000`

---

## 📁 Key Admin Files

| File | Purpose |
|---|---|
| `frontend/.env.local` | Secret URL key for admin access |
| `frontend/pages/admin/login.js` | Admin login page |
| `frontend/pages/admin/dashboard.js` | Admin dashboard hub |
| `frontend/pages/admin/jobs.js` | Job openings CRUD |
| `frontend/pages/admin/services.js` | Services CRUD |
| `frontend/pages/admin/posts.js` | Blog posts CRUD |
| `frontend/pages/admin/applications.js` | View job applications |
| `frontend/pages/admin/messages.js` | View contact messages |
| `backend/api/models.py` | Database models |
| `backend/api/views.py` | API endpoints |
