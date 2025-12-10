# AlgoMaster API Documentation

## Base URL
```
http://localhost:5000
```

## Table of Contents
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [User Registration](#user-registration)
  - [User Login](#user-login)
  - [Token Refresh](#token-refresh)
  - [Logout](#logout)
- [Response Formats](#response-formats)
- [Error Handling](#error-handling)

---

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. After successful login, you receive:
- **Access Token**: Short-lived token (24 hours) for API requests
- **Refresh Token**: Long-lived token (7 days) stored in HTTP-only cookie

### Using Access Tokens

Include the access token in the Authorization header:
```
Authorization: Bearer <access_token>
```

---

## API Endpoints

### User Registration

Register a new user account (student or teacher).

**Endpoint:** `POST /api/signup`

**Request Body:**
```json
{
  "nom": "string (required)",
  "prenom": "string (required)",
  "dateNaissance": "date (required, format: YYYY-MM-DD)",
  "email": "string (required, unique)",
  "motDePasse": "string (required, min 6 characters)",
  "userType": "string (required, 'etudiant' or 'enseignant')",
  "specialite": "string (required)",
  "annee": "string (required for students, '1'-'5')",
  "grade": "string (required for teachers)"
}
```

**Student Registration Example:**
```json
{
  "nom": "Dupont",
  "prenom": "Jean",
  "dateNaissance": "2000-01-15",
  "email": "jean.dupont@example.com",
  "motDePasse": "securePassword123",
  "userType": "etudiant",
  "specialite": "Informatique",
  "annee": "1"
}
```

**Teacher Registration Example:**
```json
{
  "nom": "Martin",
  "prenom": "Claire",
  "dateNaissance": "1985-05-20",
  "email": "claire.martin@example.com",
  "motDePasse": "securePassword123",
  "userType": "enseignant",
  "specialite": "Informatique",
  "grade": "Professeur"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "New user Jean Dupont created!"
}
```

**Error Responses:**
- `400 Bad Request`: Missing required fields
- `409 Conflict`: Email already exists
- `500 Internal Server Error`: Server error

---

### User Login

Authenticate a user and receive access tokens.

**Endpoint:** `POST /api/login`

**Request Body:**
```json
{
  "email": "string (required)",
  "motDePasse": "string (required)"
}
```

**Example Request:**
```json
{
  "email": "jean.dupont@example.com",
  "motDePasse": "securePassword123"
}
```

**Success Response (200):**

*Student Login:*
```json
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "idUser": 1,
    "Nom": "Dupont",
    "Prenom": "Jean",
    "DateNaissance": "2000-01-15T00:00:00.000Z",
    "Email": "jean.dupont@example.com",
    "Specialite": "Informatique",
    "Annee": 1,
    "role": "etudiant"
  }
}
```

*Teacher Login:*
```json
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "idUser": 2,
    "Nom": "Martin",
    "Prenom": "Claire",
    "DateNaissance": "1985-05-20T00:00:00.000Z",
    "Email": "claire.martin@example.com",
    "Specialite": "Informatique",
    "Grade": "Professeur",
    "role": "enseignant"
  }
}
```

**Note:** A refresh token is automatically set as an HTTP-only cookie.

**Error Responses:**
- `400 Bad Request`: Missing email or password
- `401 Unauthorized`: Invalid credentials
- `500 Internal Server Error`: Server error

---

### Token Refresh

Refresh an expired access token using the refresh token stored in cookies.

**Endpoint:** `GET /refresh`

**Authentication:** Requires valid refresh token in cookies (automatically sent by browser)

**Success Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `401 Unauthorized`: No refresh token provided
- `403 Forbidden`: Invalid or expired refresh token

---

### Logout

Logout the current user by clearing the refresh token cookie.

**Endpoint:** `GET /logout`

**Authentication:** Optional (works with or without a valid cookie)

**Success Response (204):**
No content returned. The refresh token cookie is cleared.

---

## Protected Endpoints

### Employee Management (Example Protected Routes)

These endpoints require valid JWT authentication via the Authorization header.

**Base Path:** `/employees`

#### Get All Employees
- **Endpoint:** `GET /employees`
- **Authentication:** Required
- **Response:** Array of employee objects

#### Create Employee
- **Endpoint:** `POST /employees`
- **Authentication:** Required (Admin or Editor role)
- **Request Body:**
```json
{
  "firstname": "string",
  "lastname": "string"
}
```

#### Update Employee
- **Endpoint:** `PUT /employees`
- **Authentication:** Required (Admin or Editor role)
- **Request Body:**
```json
{
  "id": "number",
  "firstname": "string (optional)",
  "lastname": "string (optional)"
}
```

#### Delete Employee
- **Endpoint:** `DELETE /employees`
- **Authentication:** Required (Admin role only)
- **Request Body:**
```json
{
  "id": "number"
}
```

#### Get Single Employee
- **Endpoint:** `GET /employees/:id`
- **Authentication:** Required
- **Response:** Single employee object

---

## Response Formats

### Success Response Structure
```json
{
  "success": true,
  "data": {},
  "message": "Optional success message"
}
```

### Error Response Structure
```json
{
  "error": "Error message describing what went wrong",
  "message": "Optional additional context"
}
```

---

## Error Handling

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 204 | No Content - Request successful, no response body |
| 400 | Bad Request - Invalid request format or missing required fields |
| 401 | Unauthorized - Authentication required or invalid credentials |
| 403 | Forbidden - Valid authentication but insufficient permissions |
| 409 | Conflict - Resource already exists (e.g., duplicate email) |
| 500 | Internal Server Error - Server-side error |

### Common Error Messages

**400 Bad Request:**
```json
{
  "message": "All required fields must be provided."
}
```

**401 Unauthorized:**
```json
{
  "error": "Invalid credentials."
}
```

**409 Conflict:**
```json
{
  "error": "Email already exists."
}
```

---

## Authentication Flow

### 1. Registration
```
Client -> POST /api/signup -> Server
Server -> Creates user in database
Server -> 201 Created
```

### 2. Login
```
Client -> POST /api/login -> Server
Server -> Validates credentials
Server -> Generates access token (24h) and refresh token (7d)
Server -> Sets refresh token in HTTP-only cookie
Server -> Returns access token + user data
```

### 3. Making Authenticated Requests
```
Client -> GET /protected-endpoint
        -> Header: Authorization: Bearer <access_token>
Server -> Validates token
Server -> Returns protected data
```

### 4. Token Refresh
```
Client -> GET /refresh (with refresh token cookie)
Server -> Validates refresh token
Server -> Generates new access token
Server -> Returns new access token
```

### 5. Logout
```
Client -> GET /logout
Server -> Clears refresh token cookie
Server -> 204 No Content
```

---

## Database Schema

### USER Table
```sql
idUser (SERIAL PRIMARY KEY)
Nom (VARCHAR)
Prenom (VARCHAR)
DateNaissance (DATE)
Email (VARCHAR, UNIQUE)
motDePasse (VARCHAR, hashed)
```

### ETUDIANT Table
```sql
idUser (INT, FK to USER)
Specialite (VARCHAR)
Annee (INT)
```

### ENSEIGNANT Table
```sql
idUser (INT, FK to USER)
Specialite (VARCHAR)
Grade (VARCHAR)
```

---

## Security Notes

1. **Password Hashing**: All passwords are hashed using bcrypt with 10 salt rounds
2. **JWT Secrets**: Store in environment variables, never commit to version control
3. **CORS**: Configured to allow specific origins only
4. **HTTP-Only Cookies**: Refresh tokens stored in HTTP-only cookies to prevent XSS attacks
5. **Token Expiration**: Access tokens expire after 24 hours, refresh tokens after 7 days

---

## Environment Variables

Required environment variables in `.env`:

```env
# JWT Secrets
ACCESS_TOKEN_SECRET=your_access_token_secret_key
REFRESH_TOKEN_SECRET=your_refresh_token_secret_key

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=algomaster

# Server Configuration (optional)
PORT=5000
```

---

## Testing the API

### Using cURL

**Register a Student:**
```bash
curl -X POST http://localhost:5000/api/signup \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Test",
    "prenom": "User",
    "dateNaissance": "2000-01-01",
    "email": "test@example.com",
    "motDePasse": "password123",
    "userType": "etudiant",
    "specialite": "Informatique",
    "annee": "1"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "motDePasse": "password123"
  }'
```

**Access Protected Route:**
```bash
curl -X GET http://localhost:5000/employees \
  -H "Authorization: Bearer <your_access_token>"
```

### Using JavaScript (Fetch API)

**Register:**
```javascript
const response = await fetch('http://localhost:5000/api/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nom: 'Test',
    prenom: 'User',
    dateNaissance: '2000-01-01',
    email: 'test@example.com',
    motDePasse: 'password123',
    userType: 'etudiant',
    specialite: 'Informatique',
    annee: '1'
  })
});

const data = await response.json();
console.log(data);
```

**Login:**
```javascript
const response = await fetch('http://localhost:5000/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include', // Important for cookies
  body: JSON.stringify({
    email: 'test@example.com',
    motDePasse: 'password123'
  })
});

const data = await response.json();
localStorage.setItem('accessToken', data.accessToken);
```

---

## Future Endpoints (To Be Implemented)

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course (teacher only)
- `PUT /api/courses/:id` - Update course (teacher only)
- `DELETE /api/courses/:id` - Delete course (teacher only)

### Exercises
- `GET /api/exercises` - Get all exercises
- `GET /api/exercises/:id` - Get single exercise
- `POST /api/exercises` - Create exercise (teacher only)
- `PUT /api/exercises/:id` - Update exercise (teacher only)
- `DELETE /api/exercises/:id` - Delete exercise (teacher only)

### Student Progress
- `GET /api/students/:id/progress` - Get student progress
- `POST /api/students/:id/exercises/:exerciseId` - Submit exercise
- `GET /api/students/:id/achievements` - Get student achievements

---

## Support

For issues or questions, please contact the development team or create an issue in the project repository.

**Version:** 1.0.0
**Last Updated:** December 2024
