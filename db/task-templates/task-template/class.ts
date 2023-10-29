import { Id } from '/db/id.ts'
import { Task } from '/db/tasks/task.ts'
import { Kind } from '../common.ts'
import { Crg, JsonRepr } from "./typings.ts"

export abstract class TaskTemplate {
  readonly id: Id

  constructor(arg: Crg) {
    this.id = arg.id
  }

  abstract get kind(): Kind
  abstract new(...args: unknown[]): Task

  jsonify(): JsonRepr {
    return {
      id: this.id,
      kind: this.kind,
    }
  }
}