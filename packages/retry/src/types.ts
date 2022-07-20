export type Jitter = 'full' | 'none';

export interface RetryOptions {
  readonly attempts: number;
  readonly timeout?: number;
  readonly backoff?: (...props: any[]) => number;
  readonly jitter?: Jitter;
}

export interface BackoffStrategyContext {
  readonly attempt: number;
  readonly jitter: Jitter;
}
