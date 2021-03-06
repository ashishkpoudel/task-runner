import { fixedBackoffStrategy, linearBackoffStrategy, exponentialBackoffStrategy } from './backoff';

describe('Backoff', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Backoff without jitter', () => {
    it.each([
      [1, 200],
      [2, 500],
      [3, 600],
    ])('should return appropriate fixedBackoff duration', (attempt, delay) => {
      const maxDelay = 3000;
      expect(fixedBackoffStrategy({ delay, maxDelay })({ attempt, jitter: 'none' })).toEqual(delay);
    });

    it.each([
      [1, 200, 200],
      [2, 500, 1000],
      [3, 600, 1800],
      [4, 1000, 3000],
    ])('should return appropriate linearBackoff duration', (attempt, delay, backoffDuration) => {
      const maxDelay = 3000;
      expect(linearBackoffStrategy({ delay, maxDelay })({ attempt, jitter: 'none' })).toEqual(backoffDuration);
    });

    it.each([
      [1, 100, 100],
      [2, 100, 400],
      [3, 100, 800],
      [4, 100, 1600],
    ])('should return appropriate exponentialBackoff duration', (attempt, delay, backoffDuration) => {
      const maxDelay = 3000;
      expect(exponentialBackoffStrategy({ delay, maxDelay })({ attempt, jitter: 'none' })).toEqual(backoffDuration);
    });
  });
});
