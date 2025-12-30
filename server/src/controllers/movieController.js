const openaiService = require('../services/openaiService');


const movieService = require('../services/movieService');

const getRecommendations = async (request, reply) => {
  const { preferences } = request.body;

  if (!preferences) {
    return reply.status(400).send({ error: 'Preferences are required' });
  }

  try {
    // 1. Get recommendations from AI
    const recommendations = await openaiService.generateRecommendations(preferences);

    // 2. Save to database asynchronously (don't block response if not strictly needed, but here we wait to ensure safe save)
    try {
      await movieService.saveRecommendation(preferences, recommendations);
    } catch (dbError) {
      request.log.error(dbError, 'Failed to save recommendation to DB');
      // Continue, as we still want to return results to user
    }

    // 3. Return results
    return reply.send({ data: recommendations });

  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({ error: 'Failed to generate recommendations' });
  }
};

module.exports = { getRecommendations };
