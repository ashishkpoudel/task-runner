export declare class FakeTask {
    private _abortAfterFailedCount;
    get abortAfterFailedCount(): number;
    passes(result?: string): Promise<string>;
    fails(): Promise<void>;
    abortAfterFailed(retries: number): Promise<void>;
}
