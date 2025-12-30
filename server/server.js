require('dotenv').config();
const build = require('./src/app');

const app = build({ logger: true });

const start = async () => {
  try {
    const port = process.env.PORT || 3000;
    await app.listen({ port, host: '0.0.0.0' });
    console.log(`Server listening on ${app.server.address().port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
