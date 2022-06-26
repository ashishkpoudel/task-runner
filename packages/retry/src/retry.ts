import { RetryOptions } from './types';
import { RetryAbortedError } from './retry-aborted.error';
import { RetryFailedError } from './retry-failed.error';
import { RetryTimeoutError } from './retry-timeout.error';

export const retry = async (task: () => Promise<any>, options: RetryOptions) => {
  for (let retryCount = 1; retryCount <= options.retries; retryCount++) {
    try {
      return await task();
    } catch (error) {
      if (error instanceof RetryAbortedError) {
        throw error;
      }

      if (retryCount === options.retries) {
        throw new RetryFailedError('Task retry failed.');
      }
    }
  }
};

const _timeout = async (task: () => Promise<any>, timeout?: number) => {
  const defaultTimeout = timeout ?? Infinity;

  return new Promise((resolve, reject) => {
    const timeoutRef = setTimeout(() => {
      reject(new RetryTimeoutError('Task retry timeout.'));
    }, defaultTimeout);

    task()
      .then((result) => resolve(result))
      .catch((error) => reject(error))
      .finally(() => clearInterval(timeoutRef));
  });
};
