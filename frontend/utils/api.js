// frontend/utils/api.js

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

/**
 * Enhanced fetch wrapper that handles:
 * 1. Automatic JWT token injection
 * 2. Automatic token refresh on 401 (Expired)
 * 3. Graceful redirect to login on failure
 */
export async function apiFetch(endpoint, options = {}) {
    let token = typeof window !== 'undefined' ? localStorage.getItem('adminAccessToken') : null;
    
    // Ensure the endpoint starts with a slash if it's just a path
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;
    
    const headers = { ...options.headers };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Don't set Content-Type if we're sending FormData (the browser does it with boundary)
    if (!(options.body instanceof FormData) && !headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
    }

    let response = await fetch(url, { ...options, headers });

    // Handle token expiration
    if (response.status === 401 && typeof window !== 'undefined') {
        const refreshToken = localStorage.getItem('adminRefreshToken');
        if (refreshToken) {
            try {
                const refreshRes = await fetch(`${API_BASE}/token/refresh/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ refresh: refreshToken }),
                });

                if (refreshRes.ok) {
                    const data = await refreshRes.json();
                    localStorage.setItem('adminAccessToken', data.access);
                    
                    // Retry original request with new token
                    headers['Authorization'] = `Bearer ${data.access}`;
                    return await fetch(url, { ...options, headers });
                }
            } catch (err) {
                console.error("Token refresh failed", err);
            }
        }
        
        // If we reach here, refresh failed or No refresh token
        localStorage.removeItem('adminAccessToken');
        localStorage.removeItem('adminRefreshToken');
        window.location.href = '/admin/login';
    }

    return response;
}

export function getImageUrl(imagePath) {
    if (!imagePath) return '/images/Cloud_DevOps.png';
    if (imagePath.startsWith('http')) return imagePath;
    // Handle cases where imagePath might or might not have a leading slash
    const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `${API_BASE.replace(/\/api$/, '')}${normalizedPath}`;
}
