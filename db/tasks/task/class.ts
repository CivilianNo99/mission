import { Id } from '/db/id.ts'
import { Kind } from '../common.ts'
import { Null } from '/utility/ulib.ts'
import { Temporal } from 'npm:@js-temporal/polyfill'
import { timeHasCome } from '/utility/time.ts'
import { Crg, JsonRepr } from './typings.ts'

export abstract class Task {
  readonly id: Id
  /** 
   * The time when the task is due.
   */
  timeDue: Null<Temporal.Instant>
  /** 
   * The time when the task is stale. This is always later than `this.timeDue`.
   */
  timeStale: Null<Temporal.Instant>
  description: string
  timeCreated: Temporal.Instant
  timeCompleted: Null<Temporal.Instant>
  
  constructor(arg: Crg) {
    this.id = arg.id
    this.timeDue = arg.timeDue ?? null
    this.timeStale = arg.timeStale ?? null
    this.description = arg.description
    this.timeCreated = arg.timeCreated
    this.timeCompleted = arg.timeCompleted
  }

  abstract get kind(): Kind
  abstract get isComplete(): boolean
  
  get isPending() {
    return !this.isComplete && (this.timeDue === null || !timeHasCome(this.timeDue))
  }
  get isDue() {
    return !this.isComplete && this.timeDue !== null && timeHasCome(this.timeDue)
  }
  get isStale() {
    return !this.isComplete && this.timeStale !== null && timeHasCome(this.timeStale)
  }

  // isDueIn(duration: Temporal.Duration) {
  //   return !this.isComplete && this.timeDue.isActiveIn(duration)    
  // }

  // isDueAt(instant: Temporal.Instant) {
  //   return !this.isComplete && this.timeDue.isActiveSince(instant)    
  // }

  jsonify(): JsonRepr {
    return {
      id: this.id,
      kind: this.kind,
      timeDue: this.timeDue?.toString() ?? null,
      timeStale: this.timeStale?.toString() ?? null,
      description: this.description,
      timeCreated: this.timeCreated.toString(),
      timeCompleted: this.timeCompleted?.toString() ?? null,
    }
  }
}