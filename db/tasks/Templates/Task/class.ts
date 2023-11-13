import { Id } from '/db/id.ts'
import { Task } from '/db/tasks/Task'
import { Kind } from '../kind.ts'
import { Temporal } from 'npm:@js-temporal/polyfill'
import type { Crg, JsonRepr } from "./typings.ts"
import type { MaybePromise } from '/utility/ulib.ts'

export abstract class TaskTemplate {
  /** Id of this template. */
  readonly id: Id
  timeDue: Temporal.Duration | null
  timeStale: Temporal.Duration | null
  description: string
  /** 
   * When this `TaskTemplate` was created. 
   */
  timeCreated: Temporal.Instant

  constructor(arg: Crg) {
    this.id = arg.id
    this.timeDue = arg.timeDue ?? null
    this.timeStale = arg.timeStale ?? null
    this.description = arg.description
    this.timeCreated = arg.timeCreated
  }

  abstract get kind(): Kind
  abstract create(now: Temporal.Instant): MaybePromise<Task>

  toJSON(): JsonRepr {
    return {
      id: this.id,
      kind: this.kind,
      timeDue: this.timeDue?.toString() ?? null,
      timeStale: this.timeStale?.toString() ?? null,
      description: this.description,
      timeCreated: this.timeCreated.toString(),
    }
  }
}