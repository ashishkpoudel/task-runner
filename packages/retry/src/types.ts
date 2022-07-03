export interface RetryOptions {
  readonly attempts: number;
  readonly timeout?: number;
  readonly delay?: number;
  readonly backoff?: (...props: any[]) => number;
  readonly maxBackOff?: number;
}
