import { RetryTimeoutError } from '../RetryTimeoutError';

export const applyTimeout: <T>(fn: () => Promise<T>, props: { timeout: number }) => Promise<T> = (fn, props) => {
  if (!props.timeout) {
    return fn();
  }

  return new Promise((resolve, reject) => {
    const timeoutRef = setTimeout(() => {
      reject(new RetryTimeoutError('Task retry timeout.'));
    }, props.timeout);

    fn()
      .then((success) => {
        clearTimeout(timeoutRef);
        resolve(success);
      })
      .catch((error) => reject(error));
  });
};
