'use client';

import { useEffect, useState } from 'react';

import { preloadMockWorker, getMockWorkerPromise } from '../lib/mock-preloader';
import { ContentLoader } from './ContentLoader';

export function StartMockWorker({ children }: { children: React.ReactNode }) {
  const [isMockReady, setMockReady] = useState(false);

  useEffect(() => {
    async function enableMocks() {
      // Check if mock worker is already being initialized
      const existingPromise = getMockWorkerPromise();

      if (existingPromise) {
        await existingPromise;
      } else {
        await preloadMockWorker();
      }

      setMockReady(true);
    }

    enableMocks();
  }, []);

  if (!isMockReady) {
    return <ContentLoader text='Loading mocks...' className='vh-100' />;
  }

  return <>{children}</>;
}
