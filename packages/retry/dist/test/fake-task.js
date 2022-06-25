"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeTask = void 0;
const retry_aborted_error_1 = require("../src/retry-aborted.error");
const retry_failed_error_1 = require("../src/retry-failed.error");
class FakeTask {
    constructor() {
        this._abortAfterFailedCount = 0;
    }
    get abortAfterFailedCount() {
        return this._abortAfterFailedCount;
    }
    async passes(result = 'passes') {
        return result;
    }
    async fails() {
        throw new retry_failed_error_1.RetryFailedError('Task failed');
    }
    async abortAfterFailed(retries) {
        this._abortAfterFailedCount++;
        if (this._abortAfterFailedCount === retries) {
            throw new retry_aborted_error_1.RetryAbortedError();
        }
        throw new retry_failed_error_1.RetryFailedError('Task failed');
    }
}
exports.FakeTask = FakeTask;
//# sourceMappingURL=fake-task.js.map