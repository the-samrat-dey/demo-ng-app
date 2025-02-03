import { RenderMode } from '@angular/ssr';
// eslint-disable-next-line no-duplicate-imports
import type { ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
