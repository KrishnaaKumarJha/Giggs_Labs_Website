// frontend/utils/api.js

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * Enhanced fetch wrapper that handles:
 * 1. Automatic JWT token injection
 * 2. Automatic token refresh on 401 (Expired)
 * 3. Graceful redirect to login on failure
 */
export async function apiFetch(endpoint, options = {}) {
    let token = typeof window !== 'undefined' ? localStorage.getItem('adminAccessToken') : null;
    
    // Normalize endpoint to prevent dual slashes or missing slashes
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    // Remove trailing slash if present (Hostinger's Next.js can be picky)
    const normalizedEndpoint = cleanEndpoint.endsWith('/') ? cleanEndpoint.slice(0, -1) : cleanEndpoint;
    
    const url = normalizedEndpoint.startsWith('http') ? normalizedEndpoint : `${API_BASE}${normalizedEndpoint}`;
    
    const headers = { ...options.headers };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    if (!(options.body instanceof FormData) && !headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
    }

    try {
        let response = await fetch(url, { ...options, headers });

        // Handle token expiration
        if (response.status === 401 && typeof window !== 'undefined') {
            const refreshToken = localStorage.getItem('adminRefreshToken');
            if (refreshToken) {
                try {
                    const refreshRes = await fetch(`${API_BASE}/token/refresh`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ refresh: refreshToken }),
                    });

                    if (refreshRes.ok) {
                        const data = await refreshRes.json();
                        localStorage.setItem('adminAccessToken', data.access);
                        headers['Authorization'] = `Bearer ${data.access}`;
                        return await fetch(url, { ...options, headers });
                    }
                } catch (err) {
                    console.error("Token refresh failed", err);
                }
            }
            
            localStorage.removeItem('adminAccessToken');
            localStorage.removeItem('adminRefreshToken');
            window.location.href = '/admin/login';
        }

        return response;
    } catch (err) {
        console.error(`API Fetch Error [${url}]:`, err);
        // Return a mock failed response to prevent UI hangs
        return { 
            ok: false, 
            status: 500, 
            json: async () => ({ error: 'Connection failed' }) 
        };
    }
}

export function getImageUrl(imagePath) {
    if (!imagePath) return '/images/cybersecurity.png';
    if (imagePath.startsWith('http') || imagePath.startsWith('data:')) return imagePath;
    
    // Always return a relative path with a leading slash
    const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    
    // If API_BASE is relative, we just return the path (browser handles it)
    if (!API_BASE.startsWith('http')) {
        return normalizedPath;
    }
    
    // If API_BASE is absolute (e.g. https://api.site.com/api), 
    // it returns https://api.site.com/uploads/...
    const base = API_BASE.replace(/\/api$/, '');
    return `${base}${normalizedPath}`;
}
