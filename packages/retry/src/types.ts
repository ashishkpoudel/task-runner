export interface RetryOptions {
  readonly attempts: number;
  readonly timeout?: number;
  readonly delay?: number;
  readonly backoff?: Function;
  readonly maxBackOff?: number;
}
