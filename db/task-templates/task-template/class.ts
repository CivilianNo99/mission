import { Id } from '/db/id.ts'
import { Task } from '/db/tasks/task.ts'
import { Kind } from '../common.ts'
import { Crg, JsonRepr } from "./typings.ts"
import { MaybePromise } from '/utility/ulib.ts'

export abstract class TaskTemplate {
  /** Id of this template. */
  readonly id: Id

  constructor(arg: Crg) {
    this.id = arg.id
  }

  abstract get kind(): Kind
  abstract create(): MaybePromise<Task>
  abstract createAndSave(): MaybePromise<Task>

  jsonify(): JsonRepr {
    return {
      id: this.id,
      kind: this.kind,
    }
  }
}