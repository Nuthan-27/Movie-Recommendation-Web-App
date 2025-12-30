const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateRecommendations = async (userPreference) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Switch to stable gemini-pro

    const prompt = `
      You are a movie recommendation expert. 
      Based on the user's preference: "${userPreference}", 
      suggest 3 to 5 movies.
      
      Return the output strictly as a JSON array of objects with the following keys:
      - title: Movie title
      - year: Release year (number)
      - description: A short, engaging reason for the recommendation (max 1 sentence)
      
      Do not include any markdown formatting (like \`\`\`json). Just the raw JSON string.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up potential markdown formatting if Gemini adds it
    const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();

    try {
      const recommendations = JSON.parse(jsonString);
      return recommendations;
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", text);
      throw new Error("Invalid JSON format from AI");
    }

  } catch (error) {
    console.error("Gemini API Error Full:", JSON.stringify(error, null, 2)); // Detailed logging
     console.warn("⚠️ Switching to MOCK MODE due to API error.");
    return [
      {
        title: "The Matrix (Mock)",
        year: 1999,
        description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers."
      },
      {
        title: "Inception (Mock)",
        year: 2010,
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
      },
      {
        title: "Interstellar (Mock)",
        year: 2014,
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
      }
    ];
  }
};

module.exports = { generateRecommendations };
