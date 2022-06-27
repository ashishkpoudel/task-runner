import { retry } from '../src/retry';
import { RetryAbortedError } from '../src/retry-aborted.error';
import { RetryFailedError } from '../src/retry-failed.error';
import { RetryTimeoutError } from '../src/retry-timeout.error';
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

  it('should result in timeout exceed when execution take longer then timeout', async () => {
    const task = new Promise((resolve) => {
      setTimeout(() => resolve('random task..'), 15)
    });

    await expect(retry(() => task, { retries: 1, timeout: 14 })).rejects.toThrow(
      RetryTimeoutError,
    );
  });

  it('should result in sucessful execution when task is resolved before timeout', async () => {
    const task = new Promise((resolve) => {
      setTimeout(() => resolve('random task..'), 14)
    });

    const result = await (retry(() => task, { retries: 1, timeout: 15 }));
    
    expect(result).toEqual('random task..');
  });
});
