export class ValidKey {
  private readonly path

  constructor(path: ReadonlyArray<string>) {
    this.path = path
  }

  eqKey(other: ValidKey) {
    if (this.path.length !== other.path.length) {
      return false
    }

    for (let i = 0; i < this.path.length; i++) {
      if (this.path[i] !== other.path[i]) {
        return false
      }
    }

    return true
  }
  
  eqRange(other: IDBKeyRange) {
    return other.includes(this.path)
  }

  eq(other: IDBKeyRange | ValidKey) {
    if (other instanceof IDBKeyRange) {
      return this.eqRange(other)
    } else {
      return this.eqKey(other)
    }
  }

  static fromString(key: string) {
    return new ValidKey([ key ])
  }

  static from(key: string | string[]) {
    return Array.isArray(key)
      ? new ValidKey(key)
      : this.fromString(key)
  }
}