from django.urls import path
from .views import (
    ContactCreateView,
    ContactListView,
    JobApplicationCreateView,
    JobApplicationListView,
    PostListView,
    PostDetailView,
)

urlpatterns = [
    # Contact endpoints
    path('contact/', ContactCreateView.as_view(), name='api-contact'),          # POST
    path('contacts/', ContactListView.as_view(), name='api-contacts'),         # GET list

    # Job application endpoints
    path('apply/', JobApplicationCreateView.as_view(), name='api-apply'),      # POST
    path('applications/', JobApplicationListView.as_view(), name='api-applications'),  # GET list

    # Blog endpoints
    path('posts/', PostListView.as_view(), name='api-posts'),
    path('posts/<slug:slug>/', PostDetailView.as_view(), name='api-post-detail'),

]
