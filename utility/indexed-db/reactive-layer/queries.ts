import { untrack } from "./dispatch"
import { del, put } from "./utility"
import type { Obj } from "../obj"
import type { Subscriptor, Observable } from "./observable"
import type { AddMutation, ClearMutation, DeleteMutation, PutMutation } from "./mutations"
import type { Store } from "../store"

export enum QueryType {
  Get,
  GetAll,
  GetKey,
  GetAllKeys,
  Count,
}

export interface QueryArg<Value> {
  readonly database: string
  readonly store: string
  value: Value
}

export interface CountQueryArg extends QueryArg<number> {}
export interface GetQueryArg<Value extends Obj> extends QueryArg<Value | null> {
  itemId: string
}
export interface GetKeyQueryArg extends QueryArg<string | null> {
  id: string
}
export interface GetAllQueryArg<Value extends Obj> extends QueryArg<Value[]> {
  itemIds: string[]
  max?: number
}
export interface GetAllKeysQueryArg extends QueryArg<string[]> {
  ids: string[]
  max?: number
}

export class Query<Value> implements Observable<Value> {
  value
  readonly store
  readonly database
  private readonly subscriptions: [symbol, Subscriptor<any>][] = []

  constructor(arg: QueryArg<Value>) {
    this.value = arg.value
    this.store = arg.store
    this.database = arg.database
  }
  
  onAdd(mutation: AddMutation<any>) {}
  onPut(mutation: PutMutation<any>) {}
  onClear(mutation: ClearMutation) {}
  onDelete(mutation: DeleteMutation) {}

  update(value: Value): void {
    this.value = value

    for (const [_, subscriptor] of this.subscriptions) {
      subscriptor(value)
    }
  }
  subscribe(subscriptor: Subscriptor<Value>) {
    subscriptor(this.value)

    const id = Symbol()
    this.subscriptions.push([id, subscriptor])

    return () => this.unsubscribe(id)
  }
  unsubscribe(id: symbol) {
    const idx = this.subscriptions.findIndex(subscriptor => subscriptor[0] === id)
    if (idx !== -1) {
      this.subscriptions.splice(idx, 1)
    }
    if (this.subscriptions.length === 0) {
      untrack(this)
    }
  }
} 


export class GetOneQuery<Value extends Obj> extends Query<Value | null> {
  readonly id
  constructor(arg: GetQueryArg<Value>) {
    super(arg)
    this.id = arg.itemId
  }

  onDelete(mutation: DeleteMutation): void {
    if (this.id == mutation.id) {
      this.update(null)
    }
  }

  onClear(mutation: ClearMutation): void {
    this.update(null)
  }

  onAdd(mutation: AddMutation<Value>): void {
    if (mutation.value.id === this.id) {
      this.update(mutation.value)
    }
  }

  onPut(mutation: PutMutation<Value>): void {
    if (mutation.value.id === this.id) {
      this.update(mutation.value)
    }
  }
}
export class GetManyQuery<Value extends Obj> extends Query<Value[]> {
  readonly ids

  constructor(arg: GetAllQueryArg<Value>) {
    super(arg)
    this.ids = arg.itemIds
  }

  onClear(mutation: ClearMutation): void {
    this.update([])
  }

  onDelete(mutation: DeleteMutation): void {
    if (this.ids.includes(mutation.id)) {
      this.update(this.value.filter(item => item.id !== mutation.id))
    }
  }

  onAdd(mutation: AddMutation<Value>): void {
    if (this.ids.includes(mutation.value.id)) {
      this.update([ ...this.value, mutation.value ])
    }
  }
  onPut(mutation: PutMutation<Value>): void {
    if (this.ids.includes(mutation.value.id)) {
      this.update(put(this.value, mutation.value))
    }
  }
}
export class GetAllQuery<T extends Obj> extends Query<T[]> {
  onAdd(mutation: AddMutation<any>): void {
    this.update([ ...this.value, mutation.value ])
  }
  onPut(mutation: PutMutation<T>): void {
    this.update(put<T>(this.value, mutation.value))
  }
  
  onClear(mutation: ClearMutation): void {
    this.update([])
  }
  
  onDelete(mutation: DeleteMutation): void {
    this.update(del<T>(this.value, mutation.id))
  }
}

export function createGetOneQuery<T extends Obj>(store: Store<T>, itemId: string) {
  return new GetOneQuery<T>({
    value: null,
    store: store.name,
    itemId: itemId,
    database: store.database.name,
  })
}
export function createGetManyQuery<T extends Obj>(store: Store<T>, itemIds: string[]) {
  return new GetManyQuery<T>({
    value: [],
    store: store.name,
    itemIds: itemIds,
    database: store.database.name,
  })
}
export function createGetAllQuery<T extends Obj>(store: Store<T>) {
  return new GetAllQuery<T>({
    database: store.database.name,
    store: store.name,
    value: [],
  })
}