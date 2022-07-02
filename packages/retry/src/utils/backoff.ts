export const fixedBackoff = (delay: number, maxBackoff: number) => {
  return Math.min(delay, maxBackoff);
};

export const linearBackoff = (attempt: number, delay: number, maxBackoff: number) => {
  return Math.min(attempt * delay, maxBackoff);
};

export const exponentialBackoff = (attempt: number, delay: number, maxBackoff: number) => {
  return Math.min(Math.pow(delay, attempt), maxBackoff);
};

export const resolveBackoffDuration = (strategy: string) => {
  return (attempt: number, delay: number, maxBackoff: number) => {
    const backoff = {
      'fixed': fixedBackoff(delay, maxBackoff),
      'linear': linearBackoff(attempt, delay, maxBackoff),
      'exponential': exponentialBackoff(attempt, delay, maxBackoff),
    }[strategy];

    if (!backoff) throw new Error('Invalid backoff strategy');

    return backoff;
  };
};
