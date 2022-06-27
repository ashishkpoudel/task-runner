import { RetryOptions } from './types';
import { RetryAbortedError } from './retry-aborted.error';
import { RetryFailedError } from './retry-failed.error';
import { RetryTimeoutError } from './retry-timeout.error';

/**
 * Decide later: oop or functional
 */

class Retry {
  constructor(private readonly options: RetryOptions) {}

  private applyTimeout<T>(fn: () => Promise<T>): Promise<T> {
    const executionTimeout = this.options?.timeout ?? Infinity;

    return new Promise((resolve, reject) => {
      const timeoutRef = setTimeout(() => {
        reject(new RetryTimeoutError('Task retry timeout.'));
      }, executionTimeout);

      fn()
        .then((success) => {
          clearTimeout(timeoutRef);
          resolve(success);
        })
        .catch((error) => reject(error));
    });
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    const task = async () => {
      for (let retryCount = 1; retryCount <= this.options.retries; retryCount++) {
        try {
          return await fn();
        } catch (error) {
          if (error instanceof RetryAbortedError) {
            throw error;
          }
        }
      }

      throw new RetryFailedError('Task retry failed.');
    };

    return this.applyTimeout(task);
  }
}

export async function retry<T>(fn: () => Promise<T>, options: RetryOptions): Promise<T> {
  return new Retry(options).execute<T>(fn);
}
