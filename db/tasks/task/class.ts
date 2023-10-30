import { Id } from '/db/id.ts'
import { Kind } from '../common.ts'
import { MaybePromise } from '/utility/ulib.ts'
import { Crg, JsonRepr } from './typings.ts'

export abstract class Task {
  readonly id: Id

  constructor(arg: Crg) {
    this.id = arg.id
  }

  abstract get kind(): Kind
  abstract create(): Task
  abstract createAndSave(): MaybePromise<Task>

  jsonify(): JsonRepr {
    return {
      id: this.id,
      kind: this.kind,
    }
  }
}