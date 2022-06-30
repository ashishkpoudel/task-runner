export interface RetryOptions {
  readonly attempts: number;
  readonly timeout?: number;
  readonly delay?: number;
}
