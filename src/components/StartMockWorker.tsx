'use client';

import { useEffect, useState } from 'react';
import { ContentLoader } from './ContentLoader';

export function StartMockWorker({ children }: { children: React.ReactNode }) {
  const [isMockReady, setMockReady] = useState(false);

  useEffect(() => {
    async function enableMocks() {
      const { initMocks } = await import('../mocks/initMock');
      await initMocks();

      setMockReady(true);
    }

    enableMocks();
  }, []);

  if (!isMockReady) {
    return <ContentLoader text='Loading mocks...' className='vh-100' />;
  }

  return <>{children}</>;
}
