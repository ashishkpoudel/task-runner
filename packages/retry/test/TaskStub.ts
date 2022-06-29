import { RetryAbortedError } from '../src/RetryAbortedError';
import { RetryFailedError } from '../src/RetryFailedError';

export class TaskStub {
  private _abortAfterFailedCount = 0;

  get abortAfterFailedCount() {
    return this._abortAfterFailedCount;
  }

  async passes(result = 'passes') {
    return result;
  }

  async fails() {
    throw new RetryFailedError('Task retry failed.');
  }

  async abortAfterFailed(retries: number) {
    this._abortAfterFailedCount++;

    if (this._abortAfterFailedCount === retries) {
      throw new RetryAbortedError('Task retry aborted.');
    }

    throw new RetryFailedError('Task retry failed.');
  }
}
