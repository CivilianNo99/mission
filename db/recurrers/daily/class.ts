import { range } from "/utility/ulib.ts"
import { Kind } from '../common.ts'
import { Recurrer } from '../recurrer.ts'
import { Crg, JsonRepr, NewArg } from './typings.ts'

export class DailyRecurrer extends Recurrer {
  /** We apply this recurrer once everyday. */
  recurrer: Recurrer
  /** last day we applied `this.recurrer`. */
  lastDay = new Date()

  constructor(arg: Crg) {
    super()
    this.lastDay = new Date(arg.lastDay)
    this.recurrer = arg.recurrer
  }

  get kind(): Kind {
    return Kind.Daily
  }

  async apply() {
    const today = new Date()
    const days = daysBetween(this.lastDay, today)

    if (days > 0) {
      this.lastDay = today

      for (const _ of range(days)) {
        await this.recurrer.apply()
      }
    }
  }

  jsonify(): JsonRepr {
    return {
      kind: this.kind,
      lastDay: this.lastDay.getTime(),
      recurrer: this.recurrer.jsonify(),
    }
  }

  static new(arg: NewArg) {
    return new DailyRecurrer({
      // DailyRecurrer's implmentation only starts applying the sub recurrer
      // after a day from the DailyRecurrer's creation date. So we set this property
      // to to tomorrow to make the DailyRecurrer start applying the sub recurrer from now.  
      lastDay: Tomorrow().getTime(),
      recurrer: arg.recurrer,
    })
  }
}

function daysBetween(startDate: Date, endDate: Date) {
  // The number of milliseconds in all UTC days (no daylight saving time)
  const oneDay = 1000 * 60 * 60 * 24;

  // A day in UTC always lasts 24 hours (unlike in other time formats)
  const start = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  const end = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());

  // so it's safe to divide by 24 hours
  return (start - end) / oneDay;
}
function Tomorrow() {
  const today = new Date()
  today.setDate(today.getDate() - 1)
  return today
}