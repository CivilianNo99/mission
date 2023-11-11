export type Subscriptor<T> = (value: T) => unknown

export interface Observable<T> {
  subscribe(subscriptor: Subscriptor<T>): () => void
  set(value: T): void
}