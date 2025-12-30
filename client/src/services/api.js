const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/movies/recommend';


export const getRecommendations = async (preferences) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ preferences }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch recommendations');
  }

  const data = await response.json();
  return data.data; // Assuming backend returns { data: [...] }
};
