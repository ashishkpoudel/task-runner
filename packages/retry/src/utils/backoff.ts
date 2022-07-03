export const fixedBackoff = (delay: number, maxDelay: number) => {
  return (attempt: number) => {
    return Math.min(delay + attempt * 0, maxDelay);
  };
};

export const linearBackoff = (delay: number, maxDelay: number) => {
  return (attempt: number) => {
    return Math.min(attempt * delay, maxDelay);
  };
};

export const exponentialBackoff = (delay: number, maxDelay: number) => {
  return (attempt: number) => {
    return Math.min(Math.pow(delay, attempt), maxDelay);
  };
};

export const jitteredExponentialBackoff = (delay: number, maxDelay: number) => {
  return (attempt: number) => {
    return Math.round(Math.random() * exponentialBackoff(delay, maxDelay)(attempt));
  };
};
