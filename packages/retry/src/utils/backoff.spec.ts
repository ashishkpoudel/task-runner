import { fixedBackoff, linearBackoff, exponentialBackoff } from './backoff';

describe('Backoff', () => {
  it.each([
    [1, 200],
    [2, 500],
    [3, 600],
  ])('should return appropriate fixedBackoff duration', (attempt, delay) => {
    const maxBackoff = 3000;
    expect(fixedBackoff(delay, maxBackoff)(attempt)).toEqual(delay);
  });

  it.each([
    [1, 200, 200],
    [2, 500, 1000],
    [3, 600, 1800],
    [4, 1000, 3000],
  ])('should return appropriate linearBackoff duration', (attempt, delay, backoffDuration) => {
    const maxBackoff = 3000;
    expect(linearBackoff(delay, maxBackoff)(attempt)).toEqual(backoffDuration);
  });

  it.each([
    [1, 10, 10],
    [2, 10, 100],
    [3, 10, 1000],
    [4, 10, 3000],
  ])('should return appropriate exponentialBackoff duration', (attempt, delay, backoffDuration) => {
    const maxBackoff = 3000;
    expect(exponentialBackoff(delay, maxBackoff)(attempt)).toEqual(backoffDuration);
  });
});
