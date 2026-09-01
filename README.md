# IntelliHire – AI Powered Resume Analyzer

IntelliHire is a full-stack AI-powered resume analysis platform that helps job seekers evaluate their resumes against job descriptions. It analyzes ATS compatibility, identifies matched and missing skills, provides AI-generated suggestions, and maintains a history of previous resume analyses.

## Features

- User Registration and Login
- JWT-based Authentication
- Protected Routes
- PDF Resume Upload
- Job Description Analysis
- AI-powered Resume Analysis using Google Gemini
- ATS Score Generation
- Matched Skills Detection
- Missing Skills Identification
- Personalized Improvement Suggestions
- Analysis History
- View Previous ATS Reports
- Delete Previous Analyses
- Download ATS Report as PDF
- User Profile
- Logout Confirmation
- Responsive Design
- Mobile Navigation Menu

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- jsPDF

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- pdf-parse

### AI
- Google Gemini API

## How IntelliHire Works

1. Create an account or log in.
2. Upload a resume in PDF format.
3. Paste the target job description.
4. IntelliHire extracts the resume content.
5. Google Gemini analyzes the resume against the job description.
6. The user receives:
   - ATS Score
   - Matched Skills
   - Missing Skills
   - Resume Improvement Suggestions
7. The analysis is saved to the user's history.
8. Users can view, download, or delete previous reports.

## Project Structure

```text
IntelliHire/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
│   ├── server.js
│   └── package.json
│
├── src/
│   ├── components/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── services/
│   └── utils/
│
├── package.json
├── vite.config.js
└── README.md
```

## Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Move into the project directory:

```bash
cd IntelliHire-AI-Resume-Analyzer
```

Install frontend dependencies:

```bash
npm install
```

Install backend dependencies:

```bash
cd backend
npm install
```

## Environment Variables

Create a `.env` file inside the backend directory and configure the required environment variables.

```env
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret
```

> Never commit your `.env` file or API keys to GitHub.

## Run Locally

Start the backend:

```bash
cd backend
npm start
```

If the project uses Nodemon during development:

```bash
npx nodemon server.js
```

Start the frontend in another terminal:

```bash
npm run dev
```

The frontend will run locally using Vite, while the backend API runs on port `5000`.

## Main Application Flow

```text
Signup / Login
      ↓
Upload Resume + Job Description
      ↓
AI Resume Analysis
      ↓
ATS Score
      ↓
Matched & Missing Skills
      ↓
AI Suggestions
      ↓
Save Analysis
      ↓
Dashboard / Analysis History
      ↓
View or Download Report
```

## Security

- Passwords are not stored as plain text.
- Authentication is handled using JWT.
- Protected pages require authentication.
- Analysis history is associated with the authenticated user.
- Environment variables and API credentials are excluded from Git tracking.

## Future Improvements

- Forgot Password / Password Reset
- Resume comparison
- More detailed ATS feedback
- Job recommendations
- Resume improvement assistant
- Cloud deployment and production monitoring

## Author

**Manshi Kumari**

- GitHub: `manshi-mathuri`
- LinkedIn: `manshi-kumari07`

## Disclaimer

IntelliHire provides AI-generated resume feedback and ATS estimates for guidance. Actual ATS results may vary depending on the employer, job portal, and recruitment system.

---

If you found this project useful, consider giving the repository a ⭐.
