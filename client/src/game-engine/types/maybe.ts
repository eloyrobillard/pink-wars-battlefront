export class Maybe<T> {
  constructor(private contents: T | null = null) {}

  /**
   * Returns value inside of Maybe, or provided default if Maybe is empty.
   * @param  {T} def
   * @returns T
   */
  unwrapOr(def: T): T {
    if (this.contents === null) {
      return def;
    }
    return this.contents;
  }
}