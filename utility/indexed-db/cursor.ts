import { Awaiter, affirmStringKey, promisify } from "./utility"
import type { Obj } from "./obj"
import type { Store } from "./store"
import { dispatchDelete, dispatchPut } from "./reactive-layer/dispatch"

type Req = IDBRequest<IDBCursorWithValue | null>

export class Cursor<T extends Obj> {
  private readonly cursor
  private readonly store

  constructor(cursor: IDBCursorWithValue, store: Store<T>) {
    this.cursor = cursor
    this.store = store
  }
  
  get value() {
    return this.store.initializer(this.cursor.value)
  }

  continue() {
    this.cursor.continue()
  }

  async delete() {
    await promisify(this.cursor.delete())
    await dispatchDelete(this.store, affirmStringKey(this.cursor.key))
  }

  async update(item: T) {
    await promisify(this.cursor.update(item))
    await dispatchPut(this.store, item)
  }

  static async * from<T extends Obj>(store: Store<T>, req: Req) {
    let awaiter = new Awaiter<Cursor<T> | null>()
    let stop = false
  
    req.onerror = () => {
      stop = true
      awaiter.throw(req.error)
    }
  
    req.onsuccess = () => {
      const cursor = req.result
      if (cursor === null) {
        stop = true
        awaiter.return(null)
        return
      }
      
      awaiter.return(new Cursor(cursor, store))
      awaiter = new Awaiter()
    }
  
    while (!stop) {
      yield await awaiter.promise
    }
  }
}