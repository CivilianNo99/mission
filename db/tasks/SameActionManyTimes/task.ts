import { Id } from '/db/id.ts'
import { Kind } from '../common.ts'
import { Task } from '../Task/index.ts'
import { Temporal } from 'npm:@js-temporal/polyfill'
import type { Crg, JsonRepr, NewArg } from './typings.ts'

/** 
 * This `Task` represents a real-world task consisting of performing
 * some action multiple times. 
*/
export class SameActionManyTimesTask extends Task {
  /** 
   * How many times the action must be performed.
   */
  timesActionMustBePerformed
  /** 
   * How many times the action was performed.
   * 
   * May be larger than `this.timesActionMustBePerformed`.
  */
  timesActionPerformed

  constructor(arg: Crg) {
    super(arg)
    this.timesActionPerformed = arg.timesActionPerformed
    this.timesActionMustBePerformed = arg.timesActionMustBePerformed
  }

  get kind() {
    return Kind.SameActionManyTimesTask
  }
  
  get isComplete() {
    return this.timesActionPerformed >= this.timesActionMustBePerformed
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

  toJSON(): JsonRepr {
    return {
      ...super.toJSON(),
      timesActionPerformed: this.timesActionPerformed,
      timesActionMustBePerformed: this.timesActionMustBePerformed,
    }
  }

  static new(arg: NewArg) {
    return new SameActionManyTimesTask({
      id: arg.id || Id(),
      timeDue: arg.timeDue ?? null,
      timeStale: arg.timeStale ?? null,
      timeCreated: arg.now,
      description: arg.description,
      timeCompleted: null,
      timesActionPerformed: 0,
      timesActionMustBePerformed: arg.timesActionMustBePerformed,
    })
  }
}