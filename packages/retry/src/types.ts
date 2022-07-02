export interface RetryOptions {
  readonly attempts: number;
  readonly timeout?: number;
  readonly delay?: number;
  readonly backoff?: 'fixed' | 'linear' | 'exponential';
  readonly maxBackOff?: number;
}
