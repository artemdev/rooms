// Preload mock worker to reduce initialization delay
let mockWorkerPromise: Promise<void> | null = null;

export function preloadMockWorker(): Promise<void> {
  if (mockWorkerPromise) {
    return mockWorkerPromise;
  }

  mockWorkerPromise = (async () => {
    if (typeof window !== 'undefined') {
      const { initMocks } = await import('../mocks/initMock');
      await initMocks();
    }
  })();

  return mockWorkerPromise;
}

export function getMockWorkerPromise(): Promise<void> | null {
  return mockWorkerPromise;
}
