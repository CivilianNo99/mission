import { Id } from '/db/id.ts'
import { Due } from '/db/dues/due.ts'
import { Kind } from '../common.ts'
import { Task } from '../task.ts'
import { Crg, JsonRepr, NewArg } from './typings.ts'
import { Null } from '/utility/ulib.ts'
import { Temporal } from 'npm:@js-temporal/polyfill'

/** 
 * This `Task` represents a real-world task consisting of performing
 * some action multiple times. 
*/
export class SameActionMultipleTimesTask extends Task {
  /** 
   * How many times the action must be performed.
   */
  timesActionMustBePerformed = 0
  /** 
   * How many times the action was performed.
   * 
   * May be larger than `this.timesActionMustBePerformed`.
  */
  timesActionPerformed = 0

  due: Due
  expiry: Due
  timeCompleted: Null<Temporal.Instant>

  constructor(arg: Crg) {
    super(arg)
    this.due = arg.due
    this.expiry = arg.expiry
    this.timeCompleted = arg.completedAt
    this.timesActionPerformed = arg.timesActionPerformed
    this.timesActionMustBePerformed = arg.timesActionMustBePerformed
  }

  get kind() {
    return Kind.SameActionMultipleTimesTask
  }
  get isDue() {
    return !this.isComplete && this.due.isActive
  }
  get isPending() {
    return !this.isComplete && !this.due.isActive
  }
  isDueIn(duration: Temporal.Duration) {
    return !this.isComplete && this.due.isActiveIn(duration)
  }
  /** 
   * Whether the action was performed as many times as required (or more).
  */
  get isComplete() {
    return this.timesActionPerformed >= this.timesActionMustBePerformed
  }
  get isExpired() {
    return this.timeCompleted !== null && this.expiry.isActiveSince(this.timeCompleted)
  }
  /** 
   * Whether the user succeeded at this `Task`.
   * 
   * The user will have succeeded at this `Task` if he has performed the 
   * action as many times as required before the `Task` expired.
  */
  get isSuccess() {
    return this.isComplete && !this.isExpired
  }
  /** 
   * Whether the user has failed at this `Task`.
   * 
   * The user will have failed at this `Task` if the `Task` expired before
   * he has performed the action as many times as required.
  */
  get isFailure() {
    // return !this.isComplete && 
    if (this.timeCompleted === null) {
      return this.expiry.isActive
    }

    return this.expiry.isActiveSince(this.timeCompleted)
  }

  do() {
    this.timesActionPerformed++

    if (this.timesActionPerformed === this.timesActionMustBePerformed) {
      this.timeCompleted = Temporal.Now.instant()
    }
  }

  undo() {
    if (this.timesActionPerformed > 0) {
      this.timesActionPerformed--
    }
  }

  jsonify(): JsonRepr {
    return {
      ...super.jsonify(),
      due: this.due.jsonify(),
      expiry: this.expiry.jsonify(),
      completedAt: this.timeCompleted?.toString() ?? null,
      timesActionPerformed: this.timesActionPerformed,
      timesActionMustBePerformed: this.timesActionMustBePerformed,
    }
  }

  static new(arg: NewArg) {
    return new SameActionMultipleTimesTask({
      id: arg.id || Id(),
      due: arg.due,
      expiry: arg.expiry,
      completedAt: null,
      timesActionPerformed: 0,
      timesActionMustBePerformed: arg.timesActionMustBePerformed,
    })
  }
}