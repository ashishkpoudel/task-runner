import { fixedBackoff, linearBackoff, exponentialBackoff } from './backoff';

describe('Backoff', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    [1, 200],
    [2, 500],
    [3, 600],
  ])('should return appropriate fixedBackoff duration', (attempt, delay) => {
    const maxDelay = 3000;
    expect(fixedBackoff({ delay, maxDelay })(attempt)).toEqual(delay);
  });

  it.each([
    [1, 200, 200],
    [2, 500, 1000],
    [3, 600, 1800],
    [4, 1000, 3000],
  ])('should return appropriate linearBackoff duration', (attempt, delay, backoffDuration) => {
    const maxDelay = 3000;
    expect(linearBackoff({ delay, maxDelay })(attempt)).toEqual(backoffDuration);
  });

  it.each([
    [1, 100, 100],
    [2, 100, 400],
    [3, 100, 800],
    [4, 100, 1600],
  ])('should return appropriate exponentialBackoff duration', (attempt, delay, backoffDuration) => {
    const maxDelay = 3000;
    expect(exponentialBackoff({ delay, maxDelay })(attempt)).toEqual(backoffDuration);
  });
});
