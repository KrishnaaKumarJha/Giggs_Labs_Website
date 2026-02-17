import os
import requests
import base64
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .models import ContactMessage, JobApplication, Post
from .serializers import ContactMessageSerializer, JobApplicationSerializer, PostSerializer
from django.conf import settings
from rest_framework.permissions import IsAdminUser


RESEND_API_KEY = os.getenv('RESEND_API_KEY', '')
HR_EMAIL = os.getenv('HR_EMAIL_RECEIVER', 'ayush.bhatt@giggslab.com')
ALLOWED_RESUME_EXTENSIONS = ['.pdf']


def send_email_via_resend(to_email, subject, html_body, attachments=None):
    """Send email using the Resend API with JSON payload and base64 attachments."""
    if not RESEND_API_KEY:
        print(f"[DEV] Email would be sent to {to_email}: {subject}")
        return False

    payload = {
        'from': 'Giggs Careers <onboarding@resend.dev>',
        'to': [to_email],
        'subject': subject,
        'html': html_body,
    }

    if attachments:
        resend_attachments = []
        for att in attachments:
            content_base64 = base64.b64encode(att['content']).decode('utf-8')
            resend_attachments.append({
                'filename': att['filename'],
                'content': content_base64,
            })
        payload['attachments'] = resend_attachments

    try:
        resp = requests.post(
            'https://api.resend.com/emails',
            headers={
                'Authorization': f'Bearer {RESEND_API_KEY}',
                'Content-Type': 'application/json',
            },
            json=payload,
        )

        print(f"[Resend] API Response Status: {resp.status_code}")
        print(f"[Resend] API Response Body: {resp.text}")
        print(f"[Resend] Sending to: {to_email}")
        print(f"[Resend] From: {payload.get('from')}")
        if resp.status_code in (200, 201):
            print("[Resend] Email sent successfully.")
            return True
        else:
            print(f"[Resend] Error Response: {resp.text}")
            return False
    except Exception as e:
        print(f"[Resend] Exception during send: {e}")
        return False


class ContactCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        try:
            html = f"""
            <h2>New Contact Form Submission</h2>
            <table style="border-collapse:collapse; width:100%;">
                <tr><td style="padding:8px; font-weight:bold;">Name:</td><td style="padding:8px;">{instance.name}</td></tr>
                <tr><td style="padding:8px; font-weight:bold;">Email:</td><td style="padding:8px;">{instance.email}</td></tr>
            </table>
            <h3>Message</h3>
            <p>{instance.message}</p>
            """
            send_email_via_resend(
                to_email=HR_EMAIL,
                subject=f"[Giggs] New contact from {instance.name}",
                html_body=html,
            )
        except Exception:
            pass


class JobApplicationCreateView(generics.CreateAPIView):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
    parser_classes = [MultiPartParser, FormParser]

    def create(self, request, *args, **kwargs):
        # Validate resume file extension (PDF only)
        cv_file = request.FILES.get('cv')
        if cv_file:
            ext = os.path.splitext(cv_file.name)[1].lower()
            if ext not in ALLOWED_RESUME_EXTENSIONS:
                return Response(
                    {'cv': f'Only PDF files are allowed. Got: {ext}'},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        instance = serializer.save()
        # Send email with resume attachment via Resend
        try:
            html = f"""
            <h2>📋 New Job Application</h2>
            <table style="border-collapse:collapse; width:100%; font-size:14px;">
                <tr style="background:#f8f9fa;"><td style="padding:10px; font-weight:bold;">Position:</td><td style="padding:10px;">{instance.job_title}</td></tr>
                <tr><td style="padding:10px; font-weight:bold;">Name:</td><td style="padding:10px;">{instance.name}</td></tr>
                <tr style="background:#f8f9fa;"><td style="padding:10px; font-weight:bold;">Email:</td><td style="padding:10px;">{instance.email}</td></tr>
                <tr><td style="padding:10px; font-weight:bold;">Phone:</td><td style="padding:10px;">{instance.phone}</td></tr>
                <tr style="background:#f8f9fa;"><td style="padding:10px; font-weight:bold;">Age:</td><td style="padding:10px;">{instance.age or 'N/A'}</td></tr>
                <tr><td style="padding:10px; font-weight:bold;">Qualification:</td><td style="padding:10px;">{instance.qualification}</td></tr>
                <tr style="background:#f8f9fa;"><td style="padding:10px; font-weight:bold;">Experience:</td><td style="padding:10px;">{instance.experience}</td></tr>
                <tr><td style="padding:10px; font-weight:bold;">Address:</td><td style="padding:10px;">{instance.address}</td></tr>
                <tr style="background:#f8f9fa;"><td style="padding:10px; font-weight:bold;">Current CTC:</td><td style="padding:10px;">{instance.current_ctc}</td></tr>
                <tr><td style="padding:10px; font-weight:bold;">Expected CTC:</td><td style="padding:10px;">{instance.expected_ctc}</td></tr>
                <tr style="background:#f8f9fa;"><td style="padding:10px; font-weight:bold;">LinkedIn:</td><td style="padding:10px;">{instance.linkedin or 'N/A'}</td></tr>
                <tr><td style="padding:10px; font-weight:bold;">Portfolio:</td><td style="padding:10px;">{instance.portfolio or 'N/A'}</td></tr>
            </table>
            <h3>Cover Letter / Message</h3>
            <p>{instance.message or 'No message provided.'}</p>
            <hr>
            <p><em>Resume is attached to this email.</em></p>
            """

            attachments = []
            if instance.cv:
                instance.cv.seek(0)
                attachments.append({
                    'filename': os.path.basename(instance.cv.name),
                    'content': instance.cv.read(),
                    'type': 'application/pdf',
                })

            send_email_via_resend(
                to_email=HR_EMAIL,
                subject=f"[Giggs Careers] Application: {instance.name} — {instance.job_title}",
                html_body=html,
                attachments=attachments if attachments else None,
            )
        except Exception as e:
            print(f"[Career Email] Error: {e}")


class PostListView(generics.ListAPIView):
    queryset = Post.objects.filter(is_published=True)
    serializer_class = PostSerializer

class PostDetailView(generics.RetrieveAPIView):
    queryset = Post.objects.filter(is_published=True)
    serializer_class = PostSerializer
    lookup_field = 'slug'


class ContactListView(generics.ListAPIView):
    queryset = ContactMessage.objects.all().order_by('-created_at')
    serializer_class = ContactMessageSerializer
    permission_classes = [IsAdminUser]

class JobApplicationListView(generics.ListAPIView):
    queryset = JobApplication.objects.all().order_by('-created_at')
    serializer_class = JobApplicationSerializer
    permission_classes = [IsAdminUser]