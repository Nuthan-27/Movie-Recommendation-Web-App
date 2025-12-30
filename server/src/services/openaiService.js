const OpenAI = require('openai');

const apiKey = process.env.OPENAI_API_KEY;
const isOpenRouter = apiKey?.startsWith('sk-or-v1');

const openai = new OpenAI({
  apiKey: apiKey,
  baseURL: isOpenRouter ? 'https://openrouter.ai/api/v1' : undefined,
  defaultHeaders: isOpenRouter ? {
    "HTTP-Referer": "http://localhost:3000", // Required by OpenRouter
    "X-Title": "Movie Recommender" // Required by OpenRouter
  } : undefined
});

const generateRecommendations = async (userPreference) => {
  try {
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

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant that outputs clean JSON." },
        { role: "user", content: prompt }
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
    });

    const content = completion.choices[0].message.content.trim();
    
    // Attempt to parse JSON to ensure validity
    try {
      const recommendations = JSON.parse(content);
      return recommendations;
    } catch (parseError) {
      console.error("Failed to parse OpenAI response:", content);
      throw new Error("Invalid JSON format from AI");
    }

  } catch (error) {
    console.error("OpenAI API Error:", error.message);
    
    // Fallback Mock Data
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
