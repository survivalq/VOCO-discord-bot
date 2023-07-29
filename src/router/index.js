import { createRouter, createWebHashHistory } from 'vue-router';
import OverviewRoutes from './routes/overview';
import MessageRoutes from './routes/message';
import ErrorRoutes from './routes/error';

const router = createRouter({
  history: createWebHashHistory(), // Must use Hash mode for Electron
  routes: [
    ...OverviewRoutes,
    ...MessageRoutes,
    ...ErrorRoutes,
  ],
});

export default router;