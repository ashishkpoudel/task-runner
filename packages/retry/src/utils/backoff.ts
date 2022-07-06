export const fixedBackoff = (props: { delay: number; maxDelay: number }) => {
  return (attempt: number) => {
    const { delay, maxDelay } = props;
    return Math.min(delay + attempt * 0, maxDelay);
  };
};

export const linearBackoff = (props: { delay: number; maxDelay: number }) => {
  return (attempt: number) => {
    const { delay, maxDelay } = props;
    return Math.min(attempt * delay, maxDelay);
  };
};

export const exponentialBackoff = (props: { delay: number; maxDelay: number }) => {
  return (attempt: number) => {
    const { delay, maxDelay } = props;
    return Math.min(Math.pow(delay, attempt), maxDelay);
  };
};

export const jitteredExponentialBackoff = (props: { delay: number; maxDelay: number }) => {
  return (attempt: number) => {
    const { delay, maxDelay } = props;
    return Math.round(Math.random() * exponentialBackoff({ delay, maxDelay })(attempt));
  };
};
