import type { Obj } from "../obj"
import type { Store } from "../store"

export function createAddMutation<T extends Obj>(store: Store<T>, item: any) {
  return new AddMutation<T>({
    database: store.database.name,
    store: store.name,
    item: item,
  })
}
export function createPutMutation<T extends Obj>(store: Store<T>, item: any) {
  return new PutMutation<T>({
    database: store.database.name,
    store: store.name,
    item: item,
  })
}
export function createDeleteMutation(store: Store<Obj>, itemId: string) {
  return new DeleteMutation({
    database: store.database.name,
    store: store.name,
    itemId: itemId,
  })
}
export function createClearMutation(store: Store<Obj>) {
  return new ClearMutation({
    database: store.database.name,
    store: store.name,
  })
}

export enum MutationType {
  Add,
  Put,
  Clear,
  Delete,
}

export interface MutationCrg {
  store: string
  database: string
}

export interface AddMutationCrg<Value extends Obj> extends Mutation {
  item: Value
}

export interface PutMutationCrg<Value extends Obj> extends Mutation {
  item: Value
}

export interface ClearMutationCrg extends Mutation {
  // none
}

export interface DeleteMutationCrg extends Mutation {
  itemId: string
}

export class Mutation {
  readonly store
  readonly database

  constructor(arg: MutationCrg) {
    this.store = arg.store
    this.database = arg.database
  }
}

export class AddMutation<Value extends Obj> extends Mutation {
  readonly value

  constructor(arg: AddMutationCrg<Value>) {
    super(arg)
    this.value = arg.item
  }

  get type() {
    return MutationType.Add
  }
}

export class PutMutation<Value extends Obj> extends Mutation {
  readonly value

  constructor(arg: PutMutationCrg<Value>) {
    super(arg)
    this.value = arg.item
  }

  get type() {
    return MutationType.Put
  }
}

export class ClearMutation extends Mutation {
  get type() {
    return MutationType.Clear
  }
}

export class DeleteMutation extends Mutation {
  readonly id
  
  constructor(arg: DeleteMutationCrg) {
    super(arg)
    this.id = arg.itemId
  }
  
  get type() {
    return MutationType.Delete
  }
}