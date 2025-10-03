// Early initialization script for mock worker
// This should be imported at the top level to start mock worker initialization ASAP

import { preloadMockWorker } from './mock-preloader';

// Start preloading immediately when this module is imported
if (typeof window !== 'undefined') {
  preloadMockWorker().catch(console.error);
}
