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
