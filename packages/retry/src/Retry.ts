import { RetryOptions, BackoffStrategyContext } from './types';
import { waitFor } from './utils/waitFor';
import { applyTimeout } from './utils/applyTimeout';
import { isRetryable } from './utils/isRetryable';
import { fixedBackoff } from './utils/backoff';
import { RetryAbortedError } from './RetryAbortedError';
import { RetryFailedError } from './RetryFailedError';

export const retry: <T>(fn: () => Promise<T>, options: RetryOptions) => Promise<T> = (fn, options) => {
  return new Retry(options).retry(fn);
};

class Retry {
  constructor(private readonly options: RetryOptions) {}

  private get _timeout() {
    return this.options?.timeout || 0;
  }

  private get _attempts() {
    return this.options.attempts;
  }

  private get _backoff() {
    return this.options?.backoff || fixedBackoff({ delay: 100, maxDelay: 32 * 1000 });
  }

  private get _jitter() {
    return this.options?.jitter || 'none';
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
            await waitFor(
              this._backoff({
                attempt,
                jitter: this._jitter,
              } as BackoffStrategyContext)
            );
          }
        }
      }

      throw new RetryFailedError('Task retry failed.');
    };

    return applyTimeout(task, this._timeout);
  }
}
