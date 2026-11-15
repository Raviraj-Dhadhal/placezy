import { createApp } from './app';
import { connectDB } from './config/database';
import { config } from './config/env';

const startServer = async () => {
  await connectDB();
  const app = createApp();

  app.listen(config.port, () => {
    console.log(`🚀 Placezy Server running in ${config.env} mode on http://localhost:${config.port}`);
  });
};

startServer();
