import { affirmStringKey, promisify } from "./utility"
import type { Obj } from "./obj"
import type { Store } from "./store"

export class Cursor<T extends Obj> {
  private readonly cursor
  private readonly store

  constructor(cursor: IDBCursorWithValue, store: Store<T>) {
    this.cursor = cursor
    this.store = store
  }

  * [Symbol.asyncIterator]() {
    while (true) {
      yield this.cursor.value
      this.cursor.continue()
    }
  }

  async delete() {
    await promisify(this.cursor.delete())
    await this.store.dispatchDelete(affirmStringKey(this.cursor.key))
  }

  async update(item: T) {
    await promisify(this.cursor.update(item))
    await this.store.dispatchPut(item)
  }
}