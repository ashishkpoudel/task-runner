export const fixedBackoff = (delay: number, maxBackoff: number) => {
  return (attempt: number) => {
    return Math.min(delay + attempt * 0, maxBackoff);
  };
};

export const linearBackoff = (delay: number, maxBackoff: number) => {
  return (attempt: number) => {
    return Math.min(attempt * delay, maxBackoff);
  };
};

export const exponentialBackoff = (delay: number, maxBackoff: number) => {
  return (attempt: number) => {
    return Math.min(Math.pow(delay, attempt), maxBackoff);
  };
};
