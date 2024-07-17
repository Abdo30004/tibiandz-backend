import { routerConfig as authRouterConfig } from './auth.router';
import { routerConfig as fileRouterConfig } from './file.router';
import { routerConfig as homeRouterConfig } from './home.router';
import { routerConfig as logoRouterConfig } from './logo.router';

import type { Application } from 'express';

export function setupRouters(app: Application) {
  app.use(homeRouterConfig.path, homeRouterConfig.router);
  app.use(fileRouterConfig.path, fileRouterConfig.router);
  app.use(logoRouterConfig.path, logoRouterConfig.router);
  app.use(authRouterConfig.path, authRouterConfig.router);
}
