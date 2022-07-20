import { BackoffStrategyContext, Jitter } from '../types';

export const fixedBackoffStrategy = (options: { delay: number; maxDelay: number }) => {
  return (context: BackoffStrategyContext) => {
    const { attempt, jitter } = context;
    return applyJitter(Math.min(options.delay + attempt * 0, options.maxDelay), jitter);
  };
};

export const linearBackoffStrategy = (options: { delay: number; maxDelay: number }) => {
  return (context: BackoffStrategyContext) => {
    const { attempt, jitter } = context;
    return applyJitter(Math.min(attempt * options.delay, options.maxDelay), jitter);
  };
};

export const exponentialBackoffStrategy = (options: { delay: number; maxDelay: number }) => {
  return (context: BackoffStrategyContext) => {
    const { attempt, jitter } = context;
    return applyJitter(Math.min(attempt === 1 ? options.delay : Math.pow(2, attempt) * options.delay), jitter);
  };
};

const applyJitter = (backoffDuration: number, jitter: Jitter) => {
  switch (jitter) {
    case 'full':
      return Math.round(Math.random() * backoffDuration);
    case 'none':
      return backoffDuration;
    default:
      throw new Error(`Invalid jitter: ${jitter}`);
  }
};
