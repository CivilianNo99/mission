import type { ValidKey } from "./ValidKey"
import type { Obj } from "./obj"

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
  value: Value
}

export interface PutMutationCrg<Value extends Obj> extends Mutation {
  value: Value
}

export interface ClearMutationCrg extends Mutation {
  // none
}

export interface DeleteMutationCrg extends Mutation {
  key: string
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
    this.value = arg.value
  }

  get type() {
    return MutationType.Add
  }
}

export class PutMutation<Value extends Obj> extends Mutation {
  readonly value

  constructor(arg: PutMutationCrg<Value>) {
    super(arg)
    this.value = arg.value
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
  readonly key
  
  constructor(arg: DeleteMutationCrg) {
    super(arg)
    this.key = arg.key
  }
  
  get type() {
    return MutationType.Delete
  }
}