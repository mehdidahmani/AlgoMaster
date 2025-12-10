# AlgoMaster - Quick Start Guide

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database (or use the existing one)
- Git

## Project Structure

```
algomaster/
├── back/                    # Express backend
│   ├── server.js           # Main server file
│   ├── config/             # Configuration files
│   ├── controllers/        # API controllers
│   ├── routes/             # API routes
│   ├── middleware/         # Express middleware
│   └── model/              # Data models
└── front/                  # React TypeScript frontend
    ├── src/
    │   ├── services/       # API service layer
    │   ├── context/        # React contexts
    │   ├── components/     # Reusable components
    │   ├── pages/          # Page components
    │   └── App.tsx         # Main app component
    └── public/             # Static assets
```

## Setup Instructions

### 1. Backend Setup

Navigate to the backend directory:

```bash
cd back
```

Install dependencies:

```bash
npm install
```

Ensure your `.env` file is configured with:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=algomaster
ACCESS_TOKEN_SECRET=your_secret_key_here
REFRESH_TOKEN_SECRET=your_refresh_secret_key_here
```

Start the backend server:

```bash
npm start
```

Expected output:
```
Server is running on port 5000
Database connected successfully
```

### 2. Frontend Setup

In a new terminal, navigate to the frontend directory:

```bash
cd front
```

Install dependencies:

```bash
npm install
```

The `.env` file is already configured with:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

Expected output:
```
  VITE v5.4.8  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### 3. Access the Application

Open your browser and navigate to:

```
http://localhost:5173
```

## Testing the Application

### Test User Credentials

First, create a test account by clicking "S'inscrire" (Sign up):

**Example Student Account:**
- Nom: Dupont
- Prenom: Jean
- Email: jean@example.com
- Password: Test123456
- Type: Étudiant
- Spécialité: Informatique
- Année: Licence 1

**Example Teacher Account:**
- Nom: Martin
- Prenom: Claire
- Email: claire@example.com
- Password: Test123456
- Type: Enseignant
- Spécialité: Informatique
- Grade: Professeur

### Test Login Flow

1. Click "Se connecter" (Login)
2. Enter your test account credentials
3. You should be redirected to the home page
4. User name appears in the header

### Test Logout

1. Click the "Déconnexion" (Logout) button in the header
2. You should be redirected to the login page

## API Documentation

Detailed API documentation is available in:
- `back/API_DOCUMENTATION.md`

Common endpoints:
- `POST /api/signup` - Register new user
- `POST /api/login` - Login user
- `GET /logout` - Logout user
- `GET /refresh` - Refresh access token
- `GET /employees` - Get all employees (protected)

## Key Features Implemented

### Authentication
- User registration (students and teachers)
- Email/password login
- JWT-based authentication
- Automatic token refresh
- Logout functionality
- Persistent login sessions

### Frontend Integration
- API service layer for backend communication
- Authentication context for global state management
- Protected routes that require authentication
- User profile information display
- Login/logout UI in header
- Error handling and user feedback

### Security
- Access tokens (24-hour expiration)
- Refresh tokens (7-day expiration, HTTP-only cookies)
- Password hashing with bcrypt
- CORS configuration
- Role-based access control ready

## Troubleshooting

### Backend Server Won't Start
- Check if PostgreSQL is running
- Verify `.env` variables are correct
- Check if port 5000 is already in use: `lsof -i :5000`

### Frontend Won't Connect to API
- Ensure backend is running on `http://localhost:5000`
- Check `.env` file in frontend directory
- Clear browser cache and localStorage: Open DevTools → Application → Clear Site Data

### Login Not Working
- Verify backend database has the users table
- Check if your test account was created successfully during signup
- Check browser console for error messages (F12)

### CORS Errors
- Ensure backend CORS is configured correctly
- Check `back/config/corsOptions.js`

## Development Commands

### Backend
```bash
# Start server
npm start

# Run tests
npm test

# Check database connection
node test-db-connection.js
```

### Frontend
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Type check
npm run typecheck
```

## Next Steps

1. **Add More Features**
   - Implement course management (CRUD operations)
   - Build exercise submission system
   - Create student progress tracking

2. **Enhance Security**
   - Implement email verification
   - Add two-factor authentication
   - Add rate limiting for API endpoints

3. **Improve UX**
   - Add loading states
   - Implement toast notifications
   - Add form validation feedback

4. **Deployment**
   - Set up production database
   - Configure environment variables for production
   - Deploy backend (e.g., Heroku, AWS, Digital Ocean)
   - Deploy frontend (e.g., Vercel, Netlify)

## Documentation

- **API Documentation**: `back/API_DOCUMENTATION.md`
- **Frontend Integration Guide**: `FRONTEND_API_INTEGRATION.md`
- **Database Schema**: `back/database_schema.sql`

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the browser console (F12) for error messages
3. Check backend logs for server errors
4. Review the API documentation for endpoint details

## Production Checklist

Before deploying to production:

- [ ] Update `.env` files with production values
- [ ] Change `VITE_API_BASE_URL` to production API URL
- [ ] Set strong `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET`
- [ ] Enable HTTPS
- [ ] Configure CORS for production domain
- [ ] Run database migrations
- [ ] Build frontend: `npm run build`
- [ ] Test all authentication flows
- [ ] Set up SSL certificates
- [ ] Configure firewall rules
- [ ] Enable database backups

Happy coding!
