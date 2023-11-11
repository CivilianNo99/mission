import type { Obj } from "./obj"
import { Cursor } from "./cursor"
import { Database } from "./database"
import { promisify } from "./utility"
import { dispatchAdd, dispatchClear, dispatchDelete, dispatchPut, queryAll, queryMany, queryOne, track } from "./reactive-layer/dispatch"


function put<T extends Obj>(store: IDBObjectStore, item: T, key?: IDBValidKey) {
  return promisify(store.put(item, key))
}
function get<T extends Obj>(store: IDBObjectStore, query: IDBValidKey | IDBKeyRange) {
  return promisify<T | undefined>(store.get(query))
}
function getAll<T extends Obj>(store: IDBObjectStore, query?: IDBValidKey | IDBKeyRange, max?: number) {
  return promisify<T[]>(store.getAll(query, max))
}
function getKey(store: IDBObjectStore, query: IDBValidKey | IDBKeyRange) {
  return promisify(store.getKey(query))
}
function getAllKeys(store: IDBObjectStore, query: IDBValidKey | IDBKeyRange, max?: number) {
  return promisify(store.getAllKeys(query, max))
}
function clear(store: IDBObjectStore) {
  return promisify(store.clear())
}
function del(store: IDBObjectStore, query: IDBValidKey | IDBKeyRange) {
  return promisify(store.delete(query))
}
function add<T extends Obj>(store: IDBObjectStore, item: T, key?: IDBValidKey) {
  return promisify(store.add(item, key))
}

export interface StoreCrg {
  name: string
  // keyPath: string
  database: Database
  // autoIncrement?: boolean
}
export class Store<T extends Obj> {
  readonly name
  readonly database
  readonly keyPath
  readonly autoIncrement

  constructor(arg: StoreCrg) {
    this.name = arg.name
    this.keyPath = "id"
    this.database = arg.database
    this.autoIncrement = false
    this.database.registerStore(this)
  }
  
  /** 
   * Opens a readonly transaction over this store.
  */
  private query() {
    return this.database.query([ this.name ]).objectStore(this.name)
  }
  /** 
   * Opens a readwrite transaction over this store.
  */
  private mutate() {
    return this.database.mutate([ this.name ]).objectStore(this.name)
  }

  // get(id: string) {
  //   return get<T>(this.query(), id)
  // }
  // getAll(query: IDBValidKey | IDBKeyRange, max?: number) {
  //   return getAll<T>(this.query(), query, max)
  // }
  // getKey(query: IDBValidKey | IDBKeyRange) {
  //   return getKey(this.query(), query)
  // }
  // getAllKeys(query: IDBValidKey | IDBKeyRange, max?: number) {
  //   return getAllKeys(this.query(), query, max)
  // }
  
  /** 
   * Adds an item to the store. If the store has another item with the same id,
   * an error is thrown.
  */
  async add(item: T) {
    await add(this.mutate(), item)
    await dispatchAdd(this, item)
    return item
  }
  /** 
   * Adds an item to the store. If the store has another item with the same id, 
   * it is replaced by the new one.
  */
  async put(item: T) {
    await put(this.mutate(), item)
    await dispatchPut(this, item)
    return item
  }
  /** 
   * Removes all items from the store.
  */
  async clear() {
    await clear(this.mutate())
    await dispatchClear(this)
  }
  /** 
   * Removes one item from the store.
  */
  async delete(id: string) {
    await del(this.mutate(), id)
    await dispatchDelete(this, id)
    return id
  }
  
  /** 
   * Opens a readonly cursor over all the items of this store.
  */
  openQueryCursor(direction?: IDBCursorDirection) {
   return Cursor.from(this, this.query().openCursor(null, direction))
  }  
  /** 
   * Opens a readwrite cursor over all the items of this store.
  */
  openMutationCursor(direction?: IDBCursorDirection) {
    return Cursor.from(this, this.mutate().openCursor(null, direction))
  }
  /** 
   * Returns an iterator over all the items of this store.
  */
  async * iter() {
    for await (const cursor of this.openQueryCursor()) {
      if (cursor) {
        cursor.continue()
        yield cursor.value
      } else {
        return
      }
    }
  }

  /** 
   * Returns the item identified by {@param id}, or `null`. 
  */
  async one(id: string) {
    return (await get<T>(this.query(), id)) ?? null
  }
  /** 
   * Returns the items identified by {@param ids}.
  */
  async many(ids: string[]) {
    const many: T[] = []
    
    for await (const id of ids) {
      const one = await this.one(id)
      if (one) {
        many.push(one)
      }
    } 

    return many
  }
  /** 
   * Returns all the items in this store.
  */
  async all() {
    const items: T[] = []
    for await (const item of this.iter()) {
      items.push(item)
    }
    return items
  }

  /** 
   * Returns a reactive query whose value is the item identified {@param id}, or `null`.
  */
  oneR(id: string) {
    return queryOne<T>(this, id, () => this.one(id))
  }
  /** 
   * Returns a reactive query whose value is the items identified by {@param ids}.
  */
  manyR(ids: string[]) {
    return queryMany(this, ids, () => this.many(ids))
  }
  /** 
   * Returns a reactive query whose value is all the items of this store.
  */
  allR() {
    return queryAll(this, () => this.all())
  }
}