import * as functions from 'firebase-functions';
import next from 'next';

const dev = false; // production mode
const app = next({ dev, conf: { distDir: '.next' } });
const handle = app.getRequestHandler();

export const nextApp = functions.https.onRequest((req, res) => {
  return app.prepare().then(() => handle(req, res));
});
