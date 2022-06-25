"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retry = void 0;
const retry_aborted_error_1 = require("./retry-aborted.error");
const retry = async (task, options) => {
    for (let retryCount = 1; retryCount <= options.retries; retryCount++) {
        try {
            return await task();
        }
        catch (error) {
            if (error instanceof retry_aborted_error_1.RetryAbortedError) {
                return;
            }
        }
    }
};
exports.retry = retry;
//# sourceMappingURL=retry.js.map