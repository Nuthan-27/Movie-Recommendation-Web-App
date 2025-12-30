CREATE TABLE IF NOT EXISTS recommendations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_input TEXT NOT NULL,
  recommended_movies TEXT NOT NULL, -- Stored as JSON string
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
