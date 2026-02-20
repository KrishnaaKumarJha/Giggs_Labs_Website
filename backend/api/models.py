from django.db import models


class ContactMessage(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} <{self.email}>"


class JobApplication(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    qualification = models.CharField(max_length=200, blank=True)
    experience = models.CharField(max_length=100, blank=True)
    address = models.TextField(blank=True)
    current_ctc = models.CharField(max_length=50, blank=True)
    expected_ctc = models.CharField(max_length=50, blank=True)
    linkedin = models.URLField(max_length=300, blank=True)
    portfolio = models.URLField(max_length=300, blank=True)
    job_title = models.CharField(max_length=200, blank=True)
    message = models.TextField(blank=True)
    cv = models.FileField(upload_to='cvs/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.email}) — {self.job_title}"


class Post(models.Model):
    CATEGORY_CHOICES = [
        ('Article', 'Article'),
        ('Whitepaper', 'Whitepaper'),
        ('Case Study', 'Case Study'),
        ('Tech Report', 'Tech Report'),
    ]
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, max_length=220)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Article')
    excerpt = models.TextField(blank=True)
    content = models.TextField()  # markdown text
    image = models.ImageField(upload_to='posts/', null=True, blank=True)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']  # newest first

    def __str__(self):
        return f"[{self.category}] {self.title}"


class JobOpening(models.Model):
    title = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    type = models.CharField(max_length=50, default='Full-time')  # Full-time, Part-time, Contract, Internship
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} ({self.location})"


class Service(models.Model):
    icon = models.CharField(max_length=10, default='🔧')  # emoji
    title = models.CharField(max_length=200)
    tagline = models.CharField(max_length=300, blank=True)
    description = models.TextField()
    color = models.CharField(max_length=100, default='from-cyan-400 to-blue-500')  # tailwind gradient
    border_hover = models.CharField(max_length=100, default='hover:border-cyan-500/50')
    glow_hover = models.CharField(max_length=150, default='hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]')
    accent = models.CharField(max_length=50, default='text-cyan-400')
    highlights = models.JSONField(default=list, blank=True)  # list of string tags
    href = models.CharField(max_length=200, blank=True)  # link to detail page
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title
