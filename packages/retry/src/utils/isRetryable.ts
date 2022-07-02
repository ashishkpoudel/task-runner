export const isRetryable = (currentAttempt: number, maxAttempts: number) => {
  return currentAttempt < maxAttempts;
};
