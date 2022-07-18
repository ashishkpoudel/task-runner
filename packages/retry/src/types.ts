export interface RetryOptions {
  readonly attempts: number;
  readonly timeout?: number;
  readonly backoff?: (...props: any[]) => number;
  readonly jitter?: 'full' | 'none';
}

export interface BackoffStrategyContext {
  readonly attempt: number;
  readonly jitter: 'full' | 'none';
}
