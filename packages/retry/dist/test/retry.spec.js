"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const retry_1 = require("../src/retry");
const fake_task_1 = require("./fake-task");
describe('Retry', () => {
    it('should fail after retries are completed', async () => {
        const task = new fake_task_1.FakeTask();
        const taskSpy = jest.spyOn(task, 'fails');
        await (0, retry_1.retry)(() => task.fails(), { retries: 5 });
        expect(taskSpy).toHaveBeenCalledTimes(5);
        taskSpy.mockRestore();
    });
    it('should stop retries when AbortRetryError is thrown', async () => {
        const task = new fake_task_1.FakeTask();
        const taskSpy = jest.spyOn(task, 'abortAfterFailed');
        await (0, retry_1.retry)(() => task.abortAfterFailed(3), { retries: 5 });
        expect(taskSpy).toHaveBeenCalledTimes(3);
        expect(task.abortAfterFailedCount).toEqual(3);
        taskSpy.mockRestore();
    });
});
//# sourceMappingURL=retry.spec.js.map