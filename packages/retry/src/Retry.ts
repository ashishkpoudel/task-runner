import { RetryOptions } from './types';
import { waitFor } from './utils/waitFor';
import { applyTimeout } from './utils/applyTimeout';
import { isRetryable } from './utils/isRetryable';
import { fixedBackoff } from './utils/backoff';
import { RetryAbortedError } from './RetryAbortedError';
import { RetryFailedError } from './RetryFailedError';

export class Retry {
  constructor(private readonly options: RetryOptions) {}

  private get _timeout() {
    return this.options?.timeout || 0;
  }

  private get _attempts() {
    return this.options.attempts;
  }

  private get _backoff() {
    return this.options?.backoff || fixedBackoff(100, 32 * 1000);
  }

  async retry<T>(fn: () => Promise<T>): Promise<T> {
    const task = async () => {
      for (let attempt = 1; attempt <= this._attempts; attempt++) {
        try {
          return await fn();
        } catch (error) {
          if (error instanceof RetryAbortedError) {
            throw error;
          }

          if (isRetryable(attempt, this._attempts)) {
            await waitFor(this._backoff(attempt));
          }
        }
      }

      throw new RetryFailedError('Task retry failed.');
    };

    return applyTimeout(task, this._timeout);
  }
}
