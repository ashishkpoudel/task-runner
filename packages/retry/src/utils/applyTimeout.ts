import { RetryTimeoutError } from '../RetryTimeoutError';

export const applyTimeout: <T>(fn: () => Promise<T>, timeout: number) => Promise<T> = (fn, timeout) => {
  if (!timeout) {
    return fn();
  }

  return new Promise((resolve, reject) => {
    const timeoutRef = setTimeout(() => {
      reject(new RetryTimeoutError('Task retry timeout.'));
    }, timeout);

    fn()
      .then((success) => {
        clearTimeout(timeoutRef);
        resolve(success);
      })
      .catch((error) => reject(error));
  });
};
