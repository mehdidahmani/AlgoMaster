# Frontend API Integration Guide

## Overview

The AlgoMaster frontend has been fully integrated with the backend API. This document explains the architecture, components, and how to use the new authentication system.

## Architecture

### Services Layer (`src/services/api.ts`)

The API service layer provides a centralized way to communicate with the backend:

```typescript
import { apiService } from '../services/api';

// Login
await apiService.login({ email, motDePasse });

// Sign up
await apiService.signup(userData);

// Logout
await apiService.logout();

// Refresh token
await apiService.refreshToken();

// Get auth headers for protected requests
apiService.getAuthHeader();
```

### Authentication Context (`src/context/AuthContext.tsx`)

Manages global authentication state using React Context API:

```typescript
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout, loading } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <p>Welcome, {user.Prenom}!</p>
      ) : (
        <p>Please log in</p>
      )}
    </>
  );
}
```

**Key features:**
- Persists authentication state to localStorage
- Provides user information
- Handles login/logout
- Tracks loading state

### Protected Routes (`src/components/ProtectedRoute.tsx`)

Wraps routes that require authentication:

```typescript
import ProtectedRoute from './components/ProtectedRoute';

<Routes>
  <Route
    path="/profile"
    element={
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    }
  />
</Routes>
```

Automatically redirects to login if user is not authenticated.

## Updated Components

### Login Page (`src/pages/Login.tsx`)

- Uses `useAuth()` hook for authentication
- Stores access token in localStorage
- Shows error messages for failed login
- Redirects to home on success

### Signup Page (`src/pages/Signup.tsx`)

- Validates age (minimum 16 years)
- Validates password strength
- Removes `confirmPassword` before sending to API
- Shows success message and redirects to login

### Header (`src/components/Header.tsx`)

- Shows user name when authenticated
- Displays "Logout" button for authenticated users
- Shows "Login" and "Sign up" buttons for guests
- Responsive mobile menu with auth options

## Configuration

### Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:5000
```

For production, update to your production API URL.

## Usage Examples

### Making Authenticated API Calls

```typescript
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';

function MyComponent() {
  const { accessToken } = useAuth();

  const fetchUserData = async () => {
    try {
      const headers = {
        ...apiService.getAuthHeader(),
        'Content-Type': 'application/json'
      };

      const response = await fetch('/api/user-profile', {
        method: 'GET',
        headers,
        credentials: 'include'
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return <button onClick={fetchUserData}>Load Data</button>;
}
```

### Protecting Routes

```typescript
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';

<Routes>
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />
</Routes>
```

### Checking Authentication Status

```typescript
import { useAuth } from '../context/AuthContext';

function NavBar() {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <nav>
      {isAuthenticated ? (
        <div>
          <span>Welcome, {user.Nom}</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <button>Login</button>
        </div>
      )}
    </nav>
  );
}
```

## Authentication Flow

1. **Signup**: User fills signup form → API creates account → User can login
2. **Login**: User enters credentials → API validates → Access token stored → User logged in
3. **Authenticated Requests**: Components use stored token → API validates token → Returns data
4. **Logout**: User clicks logout → Token cleared from storage → User redirected to login
5. **Token Refresh**: When access token expires → Automatic refresh using refresh token cookie

## Data Persistence

- Access token: Stored in `localStorage`
- User information: Stored in `localStorage`
- Refresh token: Stored in HTTP-only cookie (managed by backend)

The auth context automatically restores the session on page reload if valid tokens exist.

## Error Handling

All API calls include error handling:

```typescript
try {
  await apiService.login({ email, motDePasse });
  // Success
} catch (error) {
  const message = error instanceof Error ? error.message : 'An error occurred';
  // Handle error
}
```

## Adding New API Endpoints

To add new API endpoints:

1. **Add to `src/services/api.ts`**:

```typescript
export const apiService = {
  // ... existing methods ...

  getCourses: async (): Promise<Course[]> => {
    const response = await fetch(`${API_BASE_URL}/api/courses`, {
      headers: apiService.getAuthHeader(),
    });
    return handleResponse(response);
  },
};
```

2. **Use in components**:

```typescript
import { apiService } from '../services/api';

const courses = await apiService.getCourses();
```

## Development Server

Start the development server:

```bash
npm run dev
```

The frontend runs on `http://localhost:5173` by default.

Ensure the backend API is running on `http://localhost:5000` as configured in `.env`.

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## Security Notes

1. **Access Token**: Stored in localStorage - expires after 24 hours
2. **Refresh Token**: Stored in HTTP-only cookie - expires after 7 days
3. **Credentials**: Always use `credentials: 'include'` for cookie-based requests
4. **HTTPS**: Always use HTTPS in production to protect tokens

## Troubleshooting

### "Login failed" error
- Check if backend is running on `http://localhost:5000`
- Verify credentials are correct
- Check browser console for detailed error messages

### "Cannot read property 'user' of undefined"
- Ensure components using `useAuth()` are wrapped with `AuthProvider`
- Check that `App.tsx` wraps the app with `<AuthProvider>`

### Token not persisting
- Check if localStorage is enabled in browser
- Check Application tab in DevTools to see stored tokens
- Verify refresh token cookie exists in Application > Cookies

## File Structure

```
src/
├── services/
│   └── api.ts              # API service layer
├── context/
│   └── AuthContext.tsx     # Authentication context
├── components/
│   ├── Header.tsx          # Updated with auth buttons
│   ├── ProtectedRoute.tsx  # Protected route wrapper
│   └── ...
├── pages/
│   ├── Login.tsx           # Updated with API integration
│   ├── Signup.tsx          # Updated with API integration
│   └── ...
├── App.tsx                 # Updated with AuthProvider
└── .env                    # Environment configuration
```

## Next Steps

1. Implement Protected Routes for restricted pages
2. Add more endpoints to `src/services/api.ts`
3. Update other components to use authentication state
4. Implement token refresh mechanism for long sessions
5. Add role-based access control (RBAC) for student/teacher features
