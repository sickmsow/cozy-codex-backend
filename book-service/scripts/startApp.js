import { initDB } from './initDB.js';

(async () => {
  await initDB();

  // Now start the server
  const { startServer } = await import('../src/server.js');
  startServer(); // make sure server.js exports this
})();
