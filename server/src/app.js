const fastify = require('fastify');
const cors = require('@fastify/cors');
const movieRoutes = require('./routes/movieRoutes');

function build(opts = {}) {
  const app = fastify(opts);

  app.register(cors, { 
    origin: true // Allow all origins for dev
  });

  app.get('/', async (request, reply) => {
    return { status: 'ok', message: 'Movie Recommender API' };
  });

  app.get('/health', async (request, reply) => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  app.register(movieRoutes, { prefix: '/api/movies' });

  return app;
}

module.exports = build;
