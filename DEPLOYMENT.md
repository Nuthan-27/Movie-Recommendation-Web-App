# Deployment Guide

This guide explains how to deploy the Movie Recommender app step-by-step.

## Prerequisites
- A [GitHub](https://github.com/) account.
- A [Render](https://render.com/) account (for the Backend).
- A [Netlify](https://netlify.com/) account (for the Frontend).

---

## Phase 1: Push Code to GitHub
1.  Initialize a git repository in your project folder (if you haven't yet):
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
2.  Create a new repository on GitHub.
3.  Push your code to the new repository.

---

## Phase 2: Deploy Backend (Render)
1.  Log in to your **Render dashboard**.
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repository.
4.  Configure the service:
    *   **Name**: `movie-recommender-api` (or similar)
    *   **Root Directory**: `server` (Important!)
    *   **Environment**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `npm start`
5.  Scroll down to **Environment Variables** and add:
    *   `OPENAI_API_KEY`: (Paste your key here)
    *   `DB_PATH`: `/tmp/db.sqlite` (Or leave empty to use default, but `/tmp` avoids permission errors).
    *   *Note: Since we use SQLite, the database will reset every time the server restarts. This is fine for a demo.*
6.  Click **Create Web Service**.
7.  Wait for the deployment to finish. **Copy the backend URL** (e.g., `https://movie-api.onrender.com`).

---

## Phase 3: Deploy Frontend (Netlify)
1.  Log in to your **Netlify dashboard**.
2.  Click **Add new site** -> **Import from an existing project**.
3.  Choose **GitHub** and select your repository.
4.  Configure the build settings:
    *   **Base directory**: `client`
    *   **Build command**: `npm run build`
    *   **Publish directory**: `client/dist`
5.  Click **Environment variables** (or "Site configuration" after creating):
    *   Key: `VITE_API_URL`
    *   Value: (Paste the Render Backend URL ending in `/api/movies/recommend`, e.g., `https://your-app.onrender.com/api/movies/recommend`)
6.  Click **Deploy site**.

---

## Phase 4: Final Test
1.  Open your Netlify URL (e.g., `https://movie-recommender.netlify.app`).
2.  Try adding a preference.
3.  If it works, congratulations! You are live. 🚀
