from django.urls import path
from .views import (
    ContactCreateView,
    ContactListView,
    JobApplicationCreateView,
    JobApplicationListView,
    PostListView,
    PostDetailView,
    ResumeParseView,
    JobOpeningListView,
    JobOpeningAdminListView,
    JobOpeningAdminDetailView,
    ServiceListView,
    ServiceAdminListView,
    ServiceAdminDetailView,
    PostAdminListView,
    PostAdminDetailView,
)

urlpatterns = [
    # Contact endpoints
    path('contact/', ContactCreateView.as_view(), name='api-contact'),          # POST
    path('contacts/', ContactListView.as_view(), name='api-contacts'),         # GET list (admin)

    # Job application endpoints
    path('apply/', JobApplicationCreateView.as_view(), name='api-apply'),      # POST
    path('applications/', JobApplicationListView.as_view(), name='api-applications'),  # GET list (admin)
    path('parse-resume/', ResumeParseView.as_view(), name='api-parse-resume'),  # POST

    # Blog/Post endpoints (public)
    path('posts/', PostListView.as_view(), name='api-posts'),
    path('posts/<slug:slug>/', PostDetailView.as_view(), name='api-post-detail'),

    # Job openings (public)
    path('jobs/', JobOpeningListView.as_view(), name='api-jobs'),

    # Services (public)
    path('services/', ServiceListView.as_view(), name='api-services'),

    # ─── Admin CRUD endpoints ───
    path('admin/jobs/', JobOpeningAdminListView.as_view(), name='api-admin-jobs'),
    path('admin/jobs/<int:pk>/', JobOpeningAdminDetailView.as_view(), name='api-admin-job-detail'),
    path('admin/services/', ServiceAdminListView.as_view(), name='api-admin-services'),
    path('admin/services/<int:pk>/', ServiceAdminDetailView.as_view(), name='api-admin-service-detail'),
    path('admin/posts/', PostAdminListView.as_view(), name='api-admin-posts'),
    path('admin/posts/<int:pk>/', PostAdminDetailView.as_view(), name='api-admin-post-detail'),
]
