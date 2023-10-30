import { Kind } from '../common.ts'
import { range } from '/utility/ulib.ts'
import { Recurrer } from '../recurrer.ts'
import { Temporal } from 'npm:@js-temporal/polyfill'
import { Crg, JsonRepr, NewArg } from './typings.ts'

export class WeeklyRecurrer extends Recurrer {
  /** 
   * A recurrer that we will apply one time at the start of 
   * every week starting from the next week.
   */
  recurrer: Recurrer
  /** 
   * Last week we applied `this.recurrer`. 
   */
  lastWeek: Temporal.Instant

  constructor(arg: Crg) {
    super()
    this.lastWeek = arg.lastWeek
    this.recurrer = arg.recurrer
  }

  get kind() {
    return Kind.Weekly
  }

  /** 
   * How much time passed since we last applied `this.recurrer`.
   */
  get durationSinceLastApply() {
    return this.lastWeek.until(Temporal.Now.instant())
  }

  async apply() {
    const weeks = this.durationSinceLastApply.weeks

    if (weeks > 0) {
      this.lastWeek = Temporal.Now.instant()

      for (const _ of range(weeks)) {
        await this.recurrer.apply()  
      }
    }
  }

  jsonify(): JsonRepr {
    return {
      kind: this.kind,
      lastWeek: this.lastWeek.toJSON(),
      recurrer: this.recurrer.jsonify(),
    }
  }

  static new(arg: NewArg) {
    return new WeeklyRecurrer({
      lastWeek: LastWeek(),
      recurrer: arg.recurrer,
    })
  }
}

const WEEK_DURATION = new Temporal.Duration(0, 0, 1)
function LastWeek() {
  return Temporal.Now.instant().subtract(WEEK_DURATION)
}