import { RetryAbortedError } from '../src/retry-aborted.error';
import { RetryFailedError } from '../src/retry-failed.error';

export class FakeTask {
  private _abortAfterFailedCount = 0;

  get abortAfterFailedCount() {
    return this._abortAfterFailedCount;
  }

  async passes(result = 'passes') {
    return result;
  }

  async fails() {
    throw new RetryFailedError('Task failed');
  }

  async abortAfterFailed(retries: number) {
    this._abortAfterFailedCount++;

    if (this._abortAfterFailedCount === retries) {
      throw new RetryAbortedError();
    }

    throw new RetryFailedError('Task failed');
  }
}
