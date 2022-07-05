export interface RetryOptions {
  readonly attempts: number;
  readonly timeout?: number;
  readonly backoff?: (...props: any[]) => number;
}
