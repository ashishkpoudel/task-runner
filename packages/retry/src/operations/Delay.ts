export class Delay {
  constructor(
    readonly delay: number,
    readonly currentAttempt: number,
    readonly maxAttempts: number
  ) {}

  apply() {
    return new Promise((resolve) => {
      if (this.currentAttempt < this.maxAttempts) {
        setTimeout(() => resolve(this.delay), this.delay);
        return;
      }

      resolve(this.delay);
    });
  }
}
