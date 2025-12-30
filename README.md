# 🎬 AI Movie Recommender

A full-stack, AI-powered web application that suggests movies based on your natural language preferences.

## ✨ Features
*   **AI-Powered**: Uses OpenAI's GPT models (via standardized API or OpenRouter) to understand nuanced requests like "90s action movies set in space".
*   **Responsive UI**: Fully optimized for Mobile, Tablet, and Desktop.
*   **Robust Error Handling**:
    *   **Mock Mode**: Automatically switches to mock data if the API Key is invalid or out of credits, ensuring the app never crashes.
    *   **OpenRouter Support**: Automatically detects and configures `sk-or-v1` keys.
*   **Modern Stack**: React (Vite), Node.js (Fastify), SQLite.

---

## 🚀 Getting Started

### 1. Prerequisites
-   **Node.js**: (v18 or higher recommended) -> [Download Node.js](https://nodejs.org/)
-   **API Key**: An OpenAI API Key OR an OpenRouter Key.

### 2. Backend Setup
1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment:
    Create a `.env` file in `server/` with:
    ```ini
    PORT=3000
    OPENAI_API_KEY=sk-your-key-here
    DB_PATH=./db.sqlite
    ```
4.  Start the Server:
    ```bash
    npm run dev
    ```

### 3. Frontend Setup
1.  Navigate to the client directory (in a new terminal):
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the Application:
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` in your browser.

---

## ☁️ Deployment

We have a dedicated guide for deploying to **Render (Backend)** and **Netlify (Frontend)**.

👉 **[Read the Deployment Guide](./DEPLOYMENT.md)**

---

## 🛠 Troubleshooting

| Error | Cause | Solution |
| :--- | :--- | :--- |
| **App shows "Matrix (Mock)"** | API Key is invalid or quota exceeded. | Check `server/.env`. Add credits to your OpenAI account. |
| **`EADDRINUSE`** | Port 3000 is taken. | Kill the process using port 3000. |
| **`NetworkError`** | Backend not running. | Ensure `npm run dev` is active in the `server` folder. |
