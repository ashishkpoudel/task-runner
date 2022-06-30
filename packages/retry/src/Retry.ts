import { RetryOptions } from './types';
import { RetryAbortedError } from './RetryAbortedError';
import { RetryFailedError } from './RetryFailedError';
import { RetryTimeoutError } from './RetryTimeoutError';

export class Retry {
  constructor(private readonly options: RetryOptions) {}

  private applyTimeout<T>(fn: () => Promise<T>): Promise<T> {
    if (!this.options.timeout) {
      return fn();
    }

    return new Promise((resolve, reject) => {
      const timeoutRef = setTimeout(() => {
        reject(new RetryTimeoutError('Task retry timeout.'));
      }, this.options.timeout);

      fn()
        .then((success) => {
          clearTimeout(timeoutRef);
          resolve(success);
        })
        .catch((error) => reject(error));
    });
  }

  private delay(value: number) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(undefined), value);
    });
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    const task = async () => {
      for (let attempt = 1; attempt <= this.options.attempts; attempt++) {
        try {
          return await fn();
        } catch (error) {
          if (error instanceof RetryAbortedError) {
            throw error;
          }

          await this.delay(this.options?.delay || 100);
        }
      }

      throw new RetryFailedError('Task retry failed.');
    };

    return this.applyTimeout(task);
  }
}
