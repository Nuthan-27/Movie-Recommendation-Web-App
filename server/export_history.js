const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Connect to the database
const dbPath = path.resolve(__dirname, 'db.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database ' + dbPath + ': ' + err.message);
    process.exit(1);
  }
});

// Query all recommendations
const query = `SELECT * FROM recommendations ORDER BY created_at DESC`;

db.all(query, [], (err, rows) => {
  if (err) {
    throw err;
  }

  // Parse the JSON string in 'recommended_movies' back to an object for cleaner output
  const cleanRows = rows.map(row => {
    try {
      return {
        ...row,
        recommended_movies: JSON.parse(row.recommended_movies)
      };
    } catch (e) {
      return row;
    }
  });

  // Write to file
  const outputPath = path.resolve(__dirname, 'history.json');
  fs.writeFileSync(outputPath, JSON.stringify(cleanRows, null, 2));

  console.log(`✅ Success! Exported ${rows.length} records to:`);
  console.log(outputPath);

  // Close the database connection
  db.close();
});
