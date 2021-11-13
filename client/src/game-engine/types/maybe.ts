export abstract class Maybe<T> {

	/**
   * Returns value inside of Some, or provided default if None.
   * @param  {T} def
   * @returns T
   */
  abstract unwrapOrDef(def: T): T;
  
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

	unwrapOrDef (): T {
		return this.contents;
	}

  map(cb: (content: T) => T) {
    return cb(this.contents);
  }

  isSome = true;
  isNone = false;
}

export class None<T> extends Maybe<T> {
  unwrapOrDef (def: T) {
    return def;
  }

  unwrap () {
    throw new Error('Tried to unwrap None');
  }

  map() {
    throw new Error('Tried to map on None');
  }

  isSome = false;
  isNone = true;
}
