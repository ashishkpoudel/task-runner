export const fixedBackoff = (delay: number) => {
  return delay;
}

export const linearBackoff = (attempt: number, delay: number) => {
  return attempt * delay;
}

export const exponentialBackoff = (attempt: number, delay: number) => {
  return Math.pow(delay, attempt);
}

const resolveBackoffDuration = (strategy: string) => {
  return (attempt: number, delay: number) => {
    const backoff = {
      'fixed': fixedBackoff(delay),
      'linear': linearBackoff(attempt, delay),
      'exponential': exponentialBackoff(attempt, delay),
    }[strategy];

    if (!backoff) throw new Error('Invalid backoff strategy');

    return backoff;
  }
}
