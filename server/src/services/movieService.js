const db = require('../db');

const saveRecommendation = (userInput, recommendations) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO recommendations (user_input, recommended_movies)
      VALUES (?, ?)
    `;
    const jsonRecommendations = JSON.stringify(recommendations);
    
    db.run(query, [userInput, jsonRecommendations], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
};

module.exports = { saveRecommendation };
