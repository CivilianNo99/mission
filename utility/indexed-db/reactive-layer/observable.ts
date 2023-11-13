export type Subscriptor<T> = (value: T) => unknown

export interface Observable<T> {
  subscribe(subscriptor: Subscriptor<T>): () => void
  update(value: T): void
}