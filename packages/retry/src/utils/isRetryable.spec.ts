import { isRetryable } from './isRetryable';

describe('isRetryable', () => {
  it.each([
    [5, 2, false],
    [2, 100, true],
    [3, 3, false],
    [3, 4, true],
  ])(
    'should only resolve true when current attempt is less than max attempts',
    (currentAttempt, maxAttempts, result) => {
      expect(isRetryable(currentAttempt, maxAttempts)).toEqual(result);
    }
  );
});
