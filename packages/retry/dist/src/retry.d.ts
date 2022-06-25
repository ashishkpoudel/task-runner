import { RetryOptions } from './types';
export declare const retry: (task: () => Promise<any>, options: RetryOptions) => Promise<any>;
