import { Now } from "/utility/time.ts"
import { Kind } from "../common.ts"
import { range } from "/utility/ulib.ts"
import { Recurrer } from "../recurrer.ts"
import { Crg, JsonRepr } from "./typings.ts"

export class IntervalRecurrer extends Recurrer {
  private recurrer: Recurrer
  private interval: number
  private prevApply: number

  get kind() {
    return Kind.Interval
  }

  constructor(arg: Crg) {
    super()
    this.interval = arg.interval
    this.recurrer = arg.recurrer
    this.prevApply = arg.prevApply
  }

  static new(interval: number, recurrer: Recurrer) {
    return new IntervalRecurrer({interval, prevApply: Now(), recurrer})
  }

  async apply() {
    // How many times has a number of `this.interval` milliseconds elapsed since `this.prevApply`
    const times = Math.floor((Now() - this.prevApply) / this.interval)

    // If `times` is zero, then, `this.apply` has been called less than `this.interval`
    // milliseconds ago, so, it is not valid to call it now. 
    if (times <= 0) {
      return
    }

    this.prevApply = Now()
    for (const _ of range(times)) {
      await this.recurrer.apply()
    }
  }

  jsonify(): JsonRepr {
    return {
      kind: this.kind,
      interval: this.interval,
      recurrer: this.recurrer.jsonify(),
      prevApply: this.prevApply,
    }
  }

  // static newEveryDay() {}
  // static newEveryWeek() {}
  // static newEverySunday() {}
  // static newEveryMonday() {}
  // static newEveryTuseday() {}
  // static newEveryThursday() {}
  // static newEveryFirday() {}
  // static newEverySaturday() {}
}