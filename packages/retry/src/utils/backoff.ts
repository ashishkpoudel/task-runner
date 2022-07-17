export const fixedBackoff = (options: { delay: number; maxDelay: number }) => {
  return (attempt: number) => {
    return Math.min(options.delay + attempt * 0, options.maxDelay);
  };
};

export const linearBackoff = (options: { delay: number; maxDelay: number }) => {
  return (attempt: number) => {
    return Math.min(attempt * options.delay, options.maxDelay);
  };
};

export const exponentialBackoff = (options: { delay: number; maxDelay: number }) => {
  return (attempt: number) => {
    return Math.min(attempt === 1 ? options.delay : Math.pow(2, attempt) * options.delay);
  };
};
