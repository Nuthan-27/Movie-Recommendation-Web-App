# Movie Recommender



## ✨ Features

- **🤖 AI-Powered Engine**: Utilizes OpenAI (or OpenRouter compatible models) to interpret complex user queries (e.g., "Sad movies from the 90s that end happily").
- **📱 Responsive UI**: A sleek, mobile-first interface built with React and modern CSS.
- **🖼️ Smart Posters**: Automatically fetches high-definition movie posters and backdrops using the Wikipedia API.
- **🅰️ Mock Mode**: Includes a robust fallback mode for development and testing without live API keys.
- **💾 Local History**: Caches recommendations using a lightweight SQLite database.
- **🔍 Deep Details**: Interactive modal view showing director, cast, genre, and dynamic visual backdrops.

## 📂 Project Structure

```bash
antigravity/
├── client/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── services/       # API integration
│   │   ├── App.jsx         # Main component
│   │   ├── App.css         # Styling
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js Backend
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── db/             # Database connection & schema
│   │   ├── routes/         # API endpoints
│   │   └── services/       # Business logic (OpenAI, DB)
│   ├── .env                # Environment variables (GitIgnored)
│   ├── app.js              # App entry point
│   └── package.json
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites
- **Node.js**: v16 or higher
- **npm**: v7 or higher
- **API Key**: An API key from OpenAI or OpenRouter (optional for Mock Mode).

### 1. Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
PORT=3000
OPENAI_API_KEY=your_api_key_here
DB_PATH=./db.sqlite
```
*Note: If no API key is provided, the app will automatically default to Mock Mode.*

Start the backend server:

```bash
npm run dev
# Server running at http://localhost:3000
```

### 2. Frontend Setup

Open a new terminal, navigate to the client directory, and install dependencies:

```bash
cd client
npm install
```

Start the development server:

```bash
npm run dev
# client running at http://localhost:5173
```

## 📖 Usage

1.  Open your browser and navigate to `http://localhost:5173`.
2.  In the search bar, type a natural language description of what you want to watch.
    *   *Example: "Sci-fi movies about time travel strictly from the 1980s"*
3.  Click **"Get Recommendations"**.
4.  Browse the results. Click on any movie card to view detailed information and the movie poster.

## 🗄️ Database Schema (SQLite)

The application uses a local SQLite database (`db.sqlite`) to store recommendations.

**Table: `recommendations`**

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | INTEGER PK | Auto-incrementing ID |
| `user_preference` | TEXT | The raw prompt provided by the user |
| `recommendations` | TEXT | JSON string containing the AI response |
| `created_at` | DATETIME | Timestamp of the request |

## 🔌 API Endpoints

### `POST /api/movies/recommend`

Generates movie recommendations based on user input.

**Request Body:**
```json
{
  "preference": "Cyberpunk anime movies"
}
```

**Response:**
```json
[
  {
    "title": "Akira",
    "year": 1988,
    "description": "A secret military project endangers Neo-Tokyo...",
    "director": "Katsuhiro Otomo",
    "genre": "Animation, Action, Sci-Fi",
    "rating": "8.0/10"
  },
  ...
]
```

## 🛠️ Technologies Used

-   **Frontend**: React, Vite, CSS3
-   **Backend**: Node.js, Fastify
-   **Database**: SQLite (better-sqlite3)
-   **AI Integration**: OpenAI SDK (Custom Prompt Engineering)
-   **External APIs**: Wikipedia API (Images), Placehold.co (Fallbacks)

## 🛡️ Security & Best Practices

-   **API Key Safety**: API keys are stored strictly in the backend `.env` file and are never exposed to the client.
-   **Input Validation**: User input is sanitized before processing.
-   **Error Handling**: Comprehensive error catching ensures the app doesn't crash on API failures.
-   **Git Ignore**: `.env`, `node_modules`, and `db.sqlite` are excluded from version control.

## 📦 Deployment

### Backend (Render/Heroku/Railway)
1.  Push your code to GitHub.
2.  Connect your repository to a hosting provider.
3.  Set the `Root Directory` to `server`.
4.  Add your `OPENAI_API_KEY` in the provider's Environment Variables settings.
5.  Deploy!

### Frontend (Netlify/Vercel)
1.  Connect your repository.
2.  Set the `Base Directory` to `client`.
3.  Set the `Build Command` to `npm run build`.
4.  Set the `Publish Directory` to `dist`.
5.  Add an environment variable `VITE_API_URL` pointing to your deployed Backend URL.


