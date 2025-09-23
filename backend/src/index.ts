import { env } from './config/env.js';
import { app } from './app.js';

app.listen(env.port, () => {
  console.log(`Backend listening on port ${env.port}`);
});
