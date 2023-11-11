import { Cursor } from "./cursor"
import { Database } from "./db"
import { dispatch, track } from "./dispatch"
import { AddMutation, ClearMutation, DeleteMutation, PutMutation } from "./mutations"
import { promisify } from "./utility"
import type { Obj } from "./obj"
import { GetManyQuery, GetOneQuery } from "./queries"


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
function openCursor(store: IDBObjectStore, query?: IDBValidKey | IDBKeyRange | null, direction?: IDBCursorDirection) {
  return promisify<IDBCursorWithValue | null>(store.openCursor(query, direction))
}

export interface StoreCrg {
  name: string
  keyPath: string[]
  database: Database
  autoIncrement?: boolean
}
export class Store<T extends Obj> {
  readonly name
  readonly keyPath
  readonly database
  readonly autoIncrement

  constructor(arg: StoreCrg) {
    this.name = arg.name
    this.keyPath = arg.keyPath
    this.database = arg.database
    this.autoIncrement = arg.autoIncrement ?? false
  }
  
  private openQuery() {
    return this.database.query([ this.name ]).store(this.name)
  }
  private openMutation() {
    return this.database.mutate([ this.name ]).store(this.name)
  }

  get(query: IDBValidKey | IDBKeyRange) {
    return get<T>(this.openQuery(), query)
  }
  getAll(query: IDBValidKey | IDBKeyRange, max?: number) {
    return getAll<T>(this.openQuery(), query, max)
  }
  getKey(query: IDBValidKey | IDBKeyRange) {
    return getKey(this.openQuery(), query)
  }
  getAllKeys(query: IDBValidKey | IDBKeyRange, max?: number) {
    return getAllKeys(this.openQuery(), query, max)
  }

  getOne(id: string) {
    return get<T>(this.openQuery(), id)
  }
  
  async getMany(ids: string[]) {
    const many: T[] = []
    
    for await (const id of ids) {
      const one = await this.getOne(id)
      if (one) {
        many.push(one)
      }
    } 

    return many
  }

  async rGetOne(id: string) {
    const queryObj = this.GetOneQuery(id, null)
    track(queryObj)
    this.get(id).then(value => queryObj.set(value ?? null))
    return queryObj
  }
  async rGetMany(ids: string[]) {
    const query = this.GetManyQuery([])
    track(query)
    this.getMany(ids).then(value => query.set(value))
    return query
  }

  GetOneQuery(id: string, one: T | null) {
    return new GetOneQuery<T>({
      id: id,
      value: one,
      store: this.name,
      database: this.database.name,
    })
  }
  GetManyQuery(many: T[]) {
    return new GetManyQuery<T>({
      database: this.database.name,
      store: this.name,
      value: many,
      ids: many.map(one => one.id),
    })
  }
  dispatchPut(value: T) {
    return dispatch(new PutMutation({
      database: this.database.name,
      store: this.name,
      value: value,
    }))
  }
  dispatchAdd(value: T) {
    return dispatch(new AddMutation({
      database: this.database.name,
      store: this.name,
      value: value,
    }))
  }
  dispatchClear() {
    return dispatch(new ClearMutation({
      database: this.database.name,
      store: this.name,
    }))
  }
  dispatchDelete(key: string) {
    return dispatch(new DeleteMutation({
      database: this.database.name,
      store: this.name,
      key: key,
    }))
  }
  
  async add(item: T /*, key?: IDBValidKey */) {
    await add(this.openMutation(), item)
    await this.dispatchAdd(item)
  }
  async put(item: T /*, key?: IDBValidKey */) {
    await put(this.openMutation(), item)
    await this.dispatchPut(item)
  }
  async clear() {
    await clear(this.openMutation())
    await this.dispatchClear()
  }
  async delete(query: string /* IDBValidKey | IDBKeyRange */) {
    await del(this.openMutation(), query)
    await this.dispatchDelete(query)
  }

  async openQueryCursor(query?: IDBValidKey | IDBKeyRange | null, direction?: IDBCursorDirection) {
    const native = await openCursor(this.openQuery(), query, direction)
    if (native == null) {
      return null
    } else {
      return new Cursor(native, this)
    }
  }  
  async openMutationCursor(query?: IDBValidKey | IDBKeyRange | null, direction?: IDBCursorDirection) {
    const native = await openCursor(this.openMutation(), query, direction)
    if (native == null) {
      return null
    } else {
      return new Cursor(native, this)
    }
  }

  async getAllFromCursor() {
    const all: T[] = []
    const cursor = await this.openQueryCursor(IDBKeyRange.lowerBound("0"))
    
    if (cursor === null) {
      return all
    }

    for await (const item of cursor) {
      all.push(item)
    }


    return all
  }

  // async reactiveGet(query: ValidKey /** IDBValidKey */ | IDBKeyRange) {
  //   const rx = new GetQuery<T>({
  //     database: this.database.name,
  //     query: query,
  //     store: this.name,
  //     value: await this.get(query)
  //   })
  // }

  
}

// const x = new StoreAdapter()
// const cursor = await x.openQueryCursor("")
// cursor.