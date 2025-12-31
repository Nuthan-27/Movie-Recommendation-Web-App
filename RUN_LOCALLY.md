# How to Run the App Locally 🏃‍♂️

Follow these step-by-step instructions to get the **Movie Recommender** running on your own computer.

### ✅ Prerequisites
*   **Node.js**: Ensure you have Node.js installed.
*   **API Key**: You need an OpenAI or OpenRouter API key (or you can use the built-in Mock Mode).

---

### Step 1: Start the Backend (API) 🛠️

1.  Open your **Terminal** or **Command Prompt**.
2.  Navigate to the `server` folder:
    ```bash
    cd server
    ```
3.  Install dependencies (only needed the first time):
    ```bash
    npm install
    ```
4.  Setup your environment variables:
    *   Create a file named `.env` inside the `server/` folder.
    *   Add the following content:
        ```env
        PORT=3000
        OPENAI_API_KEY=sk-or-v1-your-key-here
        DB_PATH=./db.sqlite
        ```
5.  Start the server:
    ```bash
    npm run dev
    ```
    *You should see a message like:* `Server listening on 3000`

---

### Step 2: Start the Frontend (App) 💻

1.  Open a **new** Terminal window (keep the backend running!).
2.  Navigate to the `client` folder:
    ```bash
    cd client
    ```
3.  Install dependencies (only needed the first time):
    ```bash
    npm install
    ```
4.  Start the frontend:
    ```bash
    npm run dev
    ```
    *You should see a link like:* `http://localhost:5173`

---

### Step 3: Use the App 🍿

1.  Open your web browser.
2.  Go to **[http://localhost:5173](http://localhost:5173)**.
3.  Type in a movie preference and search!

---

### ❓ Troubleshooting

*   **Error: "Address already in use"**: This means a server is already running. Close open terminals or stop the process with `Ctrl + C` and try again.
*   **App looks broken**: Try refreshing the page with `Ctrl + Shift + R` to clear the cache.
