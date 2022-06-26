import { retry } from '../src/retry';
import { RetryAbortedError } from '../src/retry-aborted.error';
import { RetryFailedError } from '../src/retry-failed.error';
import { TaskStub } from './task-stub';

describe('Retry Task', () => {
  it('should fail after retries are completed', async () => {
    const task = new TaskStub();
    const taskSpy = jest.spyOn(task, 'fails');

    await expect(retry(() => task.fails(), { retries: 5 })).rejects.toThrow(RetryFailedError);

    expect(taskSpy).toHaveBeenCalledTimes(5);
    taskSpy.mockRestore();
  });

  it('should stop retries when AbortRetryError is thrown', async () => {
    const task = new TaskStub();
    const taskSpy = jest.spyOn(task, 'abortAfterFailed');

    await expect(retry(() => task.abortAfterFailed(3), { retries: 5 })).rejects.toThrow(
      RetryAbortedError
    );

    expect(taskSpy).toHaveBeenCalledTimes(3);
    expect(task.abortAfterFailedCount).toEqual(3);

    taskSpy.mockRestore();
  });
});
