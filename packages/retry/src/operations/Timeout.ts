import { RetryTimeoutError } from '../RetryTimeoutError';

export class Timeout {
  constructor(readonly timeout: number) {}

  apply<T>(fn: () => Promise<T>): Promise<T> {
    if (!this.timeout) {
      return fn();
    }

    return new Promise((resolve, reject) => {
      const timeoutRef = setTimeout(() => {
        reject(new RetryTimeoutError('Task retry timeout.'));
      }, this.timeout);

      fn()
        .then((success) => {
          clearTimeout(timeoutRef);
          resolve(success);
        })
        .catch((error) => reject(error));
    });
  }
}
