import { Id } from '/db/id.ts'
import { Kind } from '../common.ts'
import { Temporal } from 'npm:@js-temporal/polyfill'
import { timeHasCome } from '/utility/time.ts'
import type { Null } from '/utility/ulib.ts'
import type { Crg, JsonRepr } from './typings.ts'

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

  // /** 
  //  * Whether the user succeeded at this `Task`.
  //  * 
  //  * The user will have succeeded at this `Task` if he has performed the 
  //  * action as many times as required before the `Task` expired.
  //  */
  // get isSuccess() {
  //   return this.isComplete && !this.isStale
  // }
  // /** 
  //  * Whether the user has failed at this `Task`.
  //  * 
  //  * The user will have failed at this `Task` if the `Task` expired before
  //  * he has performed the action as many times as required.
  //  */
  // get isFailure() {
  //   return this.isStale
  //   // return !this.isComplete && 
  //   if (this.timeCompleted === null) {
  //     return this. 
  //   }

  //   return this.expiry.isActiveSince(this.timeCompleted)
  // }
  
  
  // isDueIn(duration: Temporal.Duration) {
  //   return !this.isComplete && this.timeDue.isActiveIn(duration)    
  // }

  // isDueAt(instant: Temporal.Instant) {
  //   return !this.isComplete && this.timeDue.isActiveSince(instant)    
  // }

  toJSON(): JsonRepr {
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