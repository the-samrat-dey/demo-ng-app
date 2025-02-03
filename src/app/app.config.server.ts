import { mergeApplicationConfig } from '@angular/core';
// eslint-disable-next-line no-duplicate-imports
import type { ApplicationConfig } from '@angular/core'; // Type-only import
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';

import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(), provideServerRouting(serverRoutes)],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
