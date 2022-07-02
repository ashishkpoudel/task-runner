const fixedBackoff = (delay: number) => {
  return delay;
};

const linearBackoff = (attempt: number, delay: number) => {
  return attempt * delay;
};

const exponentialBackoff = (attempt: number, delay: number) => {
  return Math.pow(delay, attempt);
};

export const resolveBackoffDuration = (strategy: string) => {
  return (attempt: number, delay: number, maxBackoff: number) => {
    const backoff = {
      'fixed': fixedBackoff(delay),
      'linear': linearBackoff(attempt, delay),
      'exponential': exponentialBackoff(attempt, delay),
    }[strategy];

    if (!backoff) throw new Error('Invalid backoff strategy');

    return Math.min(backoff, maxBackoff);
  };
};
