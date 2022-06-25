import { RetryOptions } from './types';
import { RetryAbortedError } from './retry-aborted.error';

export const retry = async (task: () => Promise<any>, options: RetryOptions) => {
  for (let retryCount = 1; retryCount <= options.retries; retryCount++) {
    try {
      return await task();
    } catch (error) {
      if (error instanceof RetryAbortedError) {
        return;
      }
    }
  }
};
