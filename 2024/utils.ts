export class Counter<T> {
  private counts: Map<T, number>;

  constructor() {
    this.counts = new Map();
  }

  public add(item: T): void {
    const count = this.counts.get(item) || 0;
    this.counts.set(item, count + 1);
  }

  public get(item: T): number {
    return this.counts.get(item) || 0;
  }
}

export function exectime<T>(fn: Function, ...args: any[]): T {
  const start = performance.now();
  const result = fn(...args);
  const end = performance.now();
  console.log(`Execution time: ${end - start}ms`);
  return result;
}
