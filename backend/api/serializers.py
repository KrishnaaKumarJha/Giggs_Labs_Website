from rest_framework import serializers
from .models import ContactMessage, JobApplication, Post, JobOpening, Service


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'message', 'created_at']


class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = [
            'id', 'name', 'email', 'phone', 'age',
            'qualification', 'experience', 'address',
            'current_ctc', 'expected_ctc',
            'linkedin', 'portfolio',
            'job_title', 'message', 'cv', 'created_at',
        ]


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'category', 'excerpt', 'content', 'image', 'is_published', 'created_at', 'updated_at']


class JobOpeningSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobOpening
        fields = ['id', 'title', 'location', 'type', 'description', 'is_active', 'created_at', 'updated_at']


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = [
            'id', 'icon', 'title', 'tagline', 'description',
            'color', 'border_hover', 'glow_hover', 'accent',
            'highlights', 'href', 'order', 'is_active',
            'created_at', 'updated_at',
        ]
