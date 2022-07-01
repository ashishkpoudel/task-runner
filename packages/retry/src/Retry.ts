import { RetryOptions } from './types';
import { delay } from './operations/delay';
import { applyTimeout } from './operations/applyTimeout';
import { RetryAbortedError } from './RetryAbortedError';
import { RetryFailedError } from './RetryFailedError';

export class Retry {
  constructor(private readonly options: RetryOptions) {}

  private get _timeout() {
    return this.options?.timeout || 0;
  }

  private get _delay() {
    return this.options?.delay || 100;
  }

  private get _attempts() {
    return this.options.attempts;
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

          await delay({
            delay: this._delay,
            currentAttempt: attempt,
            maxAttempts: this._attempts,
          });
        }
      }

      throw new RetryFailedError('Task retry failed.');
    };

    return applyTimeout(task, { timeout: this._timeout });
  }
}
