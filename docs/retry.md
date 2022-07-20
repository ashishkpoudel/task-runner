# Retry

Utility to retry async operations.

## Installation

```
npm install @task-runner/retry
```

## Usage

```
import { retry, fixedBackoffStrategy } from '@task-runner/retry'

const task = () => {
  return fetch('https://example.com/data');
}

const main = async () => {
  try {
    const result = await retry(() => task, {
      attempts: 3,
      timeout: 10000,
      backoff: fixedBackoffStrategy({ delay: 200, maxDelay: 5000})
    });

    // handle result
  } catch (error) {
    // handle error
  }
}

main();
```

## Options

- `attempts: number`

  Maximum number of times to retry function.

- `timeout?: number`

  Overall timeout in milliseconds

- `backoff?: Function`

  Backoff strategy to use for increasing delay with every retry (default: fixedBackoffStrategy({ delay: 100, maxDelay: 32 * 1000 })).
  Available strategity are: fixedBackoffStrategy, linearBackoffStrategy, exponentialBackoffStrategy

- `jitter?: 'full' | 'none'`

  When you have multiple client request failing, based on the algorithm they all will retry at the same time which results in collision. Adding a randomness (jitter) to retry duration avoids the retries from several clients to happen at the same time.

  For detailed information: https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/
