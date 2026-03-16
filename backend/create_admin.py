import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth import get_user_model

def create_admin():
    User = get_user_model()
    
    # Get credentials from environment variables or use defaults
    username = os.environ.get('DJANGO_ADMIN_USERNAME', 'admin')
    email = os.environ.get('DJANGO_ADMIN_EMAIL', 'admin@giggslab.com')
    password = os.environ.get('DJANGO_ADMIN_PASSWORD')

    if not password:
        print("!! ERROR: DJANGO_ADMIN_PASSWORD not set in environment. Superuser NOT created.")
        return

    print(f"-- Attempting to setup admin with username: {username}")

    if not User.objects.filter(username=username).exists():
        print(f"Creating superuser: {username}...")
        User.objects.create_superuser(username, email, password)
        print("Superuser created successfully!")
    else:
        print(f"User {username} already exists. Updating password...")
        user = User.objects.get(username=username)
        user.set_password(password)
        user.is_staff = True
        user.is_superuser = True
        user.save()
        print("Password updated successfully!")

if __name__ == "__main__":
    create_admin()
