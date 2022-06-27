import { RetryOptions } from './types';
import { RetryAbortedError } from './retry-aborted.error';
import { RetryFailedError } from './retry-failed.error';
import { RetryTimeoutError } from './retry-timeout.error';

export async function retry<T>(task: () => Promise<T>, options: RetryOptions): Promise<T> {
  for (let retryCount = 1; retryCount <= options.retries; retryCount++) {
    try {
      return await task();
    } catch (error) {
      if (error instanceof RetryAbortedError) {
        throw error;
      }
    }
  }

  throw new RetryFailedError('Task retry failed.');
}

async function execute<T>(task: () => Promise<T>, timeout?: number): Promise<T> {
  const executionTimeout = timeout ?? Infinity;

  return new Promise((resolve, reject) => {
    const timeoutRef = setTimeout(() => {
      reject(new RetryTimeoutError('Task retry timeout.'));
    }, executionTimeout);

    task()
      .then((success) => { clearTimeout(timeoutRef); resolve(success)})
      .catch((error) => reject(error))
  });
}
