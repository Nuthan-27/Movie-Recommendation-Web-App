const movieController = require('../controllers/movieController');

async function movieRoutes(fastify, options) {
  fastify.post('/recommend', movieController.getRecommendations);
}

module.exports = movieRoutes;
