import { fixedBackoff, linearBackoff, exponentialBackoff, jitteredExponentialBackoff } from './backoff';

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
    [1, 10, 10],
    [2, 10, 100],
    [3, 10, 1000],
    [4, 10, 3000],
  ])('should return appropriate exponentialBackoff duration', (attempt, delay, backoffDuration) => {
    const maxDelay = 3000;
    expect(exponentialBackoff({ delay, maxDelay })(attempt)).toEqual(backoffDuration);
  });

  it.each([
    [1, 10, 0.1, 1],
    [2, 10, 0.4, 40],
    [3, 10, 0.8, 800],
  ])('should use Math.random() to apply jitter in exponentialBackoff', (attempt, delay, random, backoffDuration) => {
    const maxDelay = 3000;
    jest.spyOn(Math, 'random').mockReturnValue(random);

    expect(jitteredExponentialBackoff({ delay, maxDelay })(attempt)).toEqual(backoffDuration);
  });
});
