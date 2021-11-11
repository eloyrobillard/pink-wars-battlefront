export abstract class Maybe<T> {

	/**
   * Returns value inside of Some, or provided default if None.
   * @param  {T} def
   * @returns T
   */
  abstract unwrapOr(def: T): T | null;

  abstract isSome: boolean;

  abstract isNone: boolean;
}

export class Some<T> extends Maybe<T> {
	private contents;

	constructor (contents: T) {
		super();
		this.contents = contents;
	}

	unwrapOr (): T {
		return this.contents;
	}

  isSome = true;
  isNone = false;
}

export class None<T> extends Maybe<T> {
  unwrapOr (def: T) {
    return def;
  }

  isSome = false;
  isNone = true;
}
