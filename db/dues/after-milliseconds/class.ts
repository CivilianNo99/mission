import { Due } from '../due.ts'
import { Kind } from '../common.ts'
import { Temporal } from 'npm:@js-temporal/polyfill'
import { Crg, JsonRepr } from './typings.ts'

/**
 * Represents a `Task` that is due in a `Temporal.Duration` after the
 * `Task` was created.
 */
export class DueAfterDuration extends Due {
  due: Temporal.Instant

  constructor(arg: Crg) {
    super()
    this.due = arg.due
  }

  get kind(): Kind {
    return Kind.DueAfterDuration
  }

  get durationUntilDue() {
    return Temporal.Now.instant().until(this.due)
  }

  get isDue() {
    return this.durationUntilDue.seconds === 0
  }

  /** 
   * Whether the task will be due in a duration of {@param duration}.
   */
  isDueIn(duration: Temporal.Duration): boolean {
    return duration.seconds >= this.durationUntilDue.seconds
  }

  /** 
   * Whether the task will be due at the time of {@param instant}.
  */
  isDueAt(instant: Temporal.Instant): boolean {
    return instant.epochSeconds >= this.due.epochSeconds
  }

  jsonify(): JsonRepr {
    return {
      kind: this.kind,
      due: this.due.toJSON(),
    }
  }

  static new(duration: Temporal.Duration) {
    return new DueAfterDuration({
      due: Temporal.Now.instant().add(duration)
    })
  }
}