// TODO(me): This module is not complete

import { Kind } from "../common.ts"
import { Temporal } from 'npm:@js-temporal/polyfill'
import type { Crg, JsonRepr, NewArg, NewDailyArg } from "./typings"
import { type Action, Recurrer } from "../Recurrer"
import { IdentityRecurrer } from "../Identity/class.ts"

export class DurationRecurrer extends Recurrer {
  private recurrer: Recurrer
  private duration: Temporal.Duration
  private timeLastApply: Temporal.Instant

  get kind() {
    return Kind.Duration
  }

  constructor(arg: Crg) {
    super()
    this.duration = arg.duration
    this.recurrer = arg.recurrer
    this.timeLastApply = arg.timeLastApply
  }

  * times(now: Temporal.Instant) {
    while (true) {
      const time = this.timeLastApply.add(this.duration)
      if (time.epochSeconds < now.epochSeconds) {
        yield this.timeLastApply = time
      } else {
        break
      }
    }
  }

  async apply(now: Temporal.Instant, action: Action) {
    for (const time of this.times(now)) {
      await this.recurrer.apply(time, action)
    }
  }

  toJSON(): JsonRepr {
    return {
      kind: this.kind,
      interval: this.duration.toString(),
      recurrer: this.recurrer.toJSON(),
      timeLastApply: this.timeLastApply.toString(),
    }
  }

  
  
  /**
   * Reurns a recurrer that applies one time every {@param duration}
   * starting from {@param from}.
   */
  static new({ duration, now, recurrer, from }: NewArg) {
    now ??= Temporal.Now.instant()
    from ??= now
    from = now.subtract(duration).add(now.until(from))
    
    return new DurationRecurrer({
      duration: duration, 
      recurrer: recurrer ?? IdentityRecurrer.INSTANCE,
      timeLastApply: from,
    })
  }

  /** 
   * Returns a recurrer that applies one time everyday at the time (hour, 
   * minute and second) specified in {@param arg.at} starting from the day
   * specified in {@param arg.from}.
  */
  static Daily(arg: NewDailyArg) {
    const now = arg.now.toZonedDateTimeISO("UTC")
    const from = new Temporal.PlainDateTime(
      arg.from?.year ?? now.year,
      arg.from?.month ?? now.month,
      arg.from?.monthDay ?? now.day,
      arg.at?.hour ?? now.hour,
      arg.at?.minute ?? now.minute,
      arg.at?.second ?? now.second,
    ).toZonedDateTime("UTC").toInstant()


    return this.new({
      now: arg.now,
      from: from, 
      duration: DAY,
      recurrer: arg.recurrer,
    })
  }
  // static Weekly(arg: NewWeeklyArg) {
  //   const now = arg.now.toZonedDateTimeISO("UTC")
  //   const from = new Temporal.PlainDateTime(
  //     arg.from?.year ?? now.year,
  //     arg.from?.month ?? now.month,
  //     // arg.from?.
  //     0,
      
  //   )
  //   return this.new(now, WEEK.add(offset), recurrer)
  // }
  // static EverySunday(now: Temporal.Instant, offset: Temporal.Duration, recurrer = FN_RECURRER) {
  //   return this.EveryWeek(now, WEEK.add(DAY), recurrer)
  // }
  // static EveryMonday() {}
  // static EveryTuseday() {}
  // static EveryThursday() {}
  // static EveryFirday() {}
  // static EverySaturday() {}

  static fromJson() {

  }
}

function Now() {
  return Temporal.Now.instant()
}
const DAY = Temporal.Duration.from({ days: 1 })
const WEEK = Temporal.Duration.from({ weeks: 1 })

function dayRowndDown() {

}
function asDay(time: Temporal.ZonedDateTime) {
  return Temporal.ZonedDateTime.from({
    ...time,
    // Discard these fields to make it point to the start of whatever the
    // current day is.
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    microsecond: 0,
    nanosecond: 0,
  })
}
function asWeek(time: Temporal.PlainDateTime) {
  return Temporal.PlainDateTime.from({
    ...time,
    // Discard these fields to make it point to the start of whatever the
    // current week is.
    dayOfWeek: 0,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    microsecond: 0,
    nanosecond: 0,
  })
}
const UTC = new Temporal.TimeZone("UTC")