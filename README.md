# PrepPal — Frontend Client

PrepPal is a full-stack placement preparation platform designed to help CS students systematically track Data Structures & Algorithms problem solving, manage spaced revisions, and query interview prep materials using Retrieval-Augmented Generation (RAG).

## Features

- **DSA Tracker & Analytics:** Dynamic filtering across 300+ DSA problems by topic, difficulty, and completion status, paired with real-time dashboard analytics.
- **Spaced Revision Engine:** Automated 1, 3, 7, 14, and 30-day interval scheduling system for systematic problem review.
- **AI Notes Assistant (RAG):** Context-grounded Q&A interface for uploaded study materials, supporting doubt solving, question generation, and mock interview prep.
- **Authentication:** JWT-based stateless authentication with protected client-side routes.

## Tech Stack

- **Framework:** React.js
- **Styling:** Tailwind CSS
- **State & Routing:** React Context API, React Router DOM
- **HTTP Client:** Axios
- **Deployment:** Vercel

## Project Structure

```text
preppal-frontend/
├── src/
│   ├── components/      # Reusable UI components (Navbar, Modals, Cards)
│   ├── context/         # AuthContext and state management
│   ├── pages/           # Dashboard, DSATracker, NotesRAG, Auth pages
│   ├── services/        # Axios API client setup
│   ├── utils/           # Date & array utility functions
│   └── App.jsx          # Router & layout shell
├── public/              # Static assets
└── package.json
