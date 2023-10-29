export type Und<T = undefined> = T | undefined
export type Null<T = null> = T | null
export type Empty<T = null | undefined> =  T | null | undefined
export type msec = number
export type MaybePromise<T> = Promise<T> | T

export function * range(iterations: number) {
  for (let i = 0; i < iterations; i++) {
    yield i
  }
}
