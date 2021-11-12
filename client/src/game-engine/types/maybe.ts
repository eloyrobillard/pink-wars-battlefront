export abstract class Maybe<T> {

	/**
   * Returns value inside of Some, or provided default if None.
   * @param  {T} def
   * @returns T
   */
  abstract unwrapOr(def: T): T;
  
  /**
   * Returns T is Some, or throws exception
   * @returns T | void
   */
  abstract unwrap(): T | void;

  abstract map(cb: (content: T) => T): T | void;

  abstract isSome: boolean;

  abstract isNone: boolean;
}

export class Some<T> extends Maybe<T> {
	private contents;

	constructor (contents: T) {
		super();
		this.contents = contents;
	}

  unwrap(): T {
    return this.contents;
  }

	unwrapOr (): T {
		return this.contents;
	}

  map(cb: (content: T) => T) {
    return cb(this.contents);
  }

  isSome = true;
  isNone = false;
}

export class None<T> extends Maybe<T> {
  unwrapOr (def: T) {
    return def;
  }

  unwrap () {
    throw new Error('Tried to unwrap None');
  }

  map() {
    return;
  }

  isSome = false;
  isNone = true;
}
