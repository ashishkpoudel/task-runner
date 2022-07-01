import { RetryOptions } from './types';
import { Delay } from './operations/Delay';
import { Timeout } from './operations/Timeout';
import { RetryAbortedError } from './RetryAbortedError';
import { RetryFailedError } from './RetryFailedError';

export class Retry {
  constructor(private readonly options: RetryOptions) {}

  private get timeout() {
    return this.options?.timeout || 0;
  }

  private get delay() {
    return this.options?.delay || 100;
  }

  private get attempts() {
    return this.options.attempts;
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    const task = async () => {
      for (let attempt = 1; attempt <= this.attempts; attempt++) {
        try {
          return await fn();
        } catch (error) {
          if (error instanceof RetryAbortedError) {
            throw error;
          }

          await new Delay(this.delay, attempt, this.attempts).apply();
        }
      }

      throw new RetryFailedError('Task retry failed.');
    };

    return new Timeout(this.timeout).apply(task);
  }
}
