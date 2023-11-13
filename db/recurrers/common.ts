import { Temporal } from 'npm:@js-temporal/polyfill'
import * as Recurrer from './Recurrer'
// import * as FnRecurrer from './Identity'
import * as TimesRecurrer from './Times'
import * as DurationRecurrer from './Duration'
import { IdentityRecurrer } from './Identity/class'
// import * as DailyRecurrer from './daily.ts'
// import * as WeeklyRecurrer from './weekly.ts'

export enum Kind {
  Fn,
  Times,
  Duration,
  Daily,
  Weekly,
}

// function isIdentityRecurrerJsonRepr(jsonRepr: Recurrer.JsonRepr)
//   : jsonRepr is FnRecurrer.JsonRepr 
// {
//   return jsonRepr.kind === Kind.Fn
// }
function isTimesRecurrerJsonRepr(jsonRepr: Recurrer.JsonRepr)
  : jsonRepr is TimesRecurrer.JsonRepr 
{
  return jsonRepr.kind === Kind.Times
}
function isDurationRecurrerJsonRepr(jsonRepr: Recurrer.JsonRepr)
  : jsonRepr is DurationRecurrer.JsonRepr 
{
  return jsonRepr.kind === Kind.Duration
}
// function isDailyRecurrerJsonRepr(jsonRepr: Recurrer.JsonRepr): jsonRepr is DailyRecurrer.JsonRepr {
//   return jsonRepr.kind === Kind.Daily
// }
// function isWeeklyRecurrerJsonRepr(jsonRepr: Recurrer.JsonRepr): jsonRepr is WeeklyRecurrer.JsonRepr {
//   return jsonRepr.kind === Kind.Weekly
// }
// function isFnRecurrerNewArg(arg: Recurrer.NewArg): arg is FnRecurrer.NewArg {
//   return arg.kind === Kind.Fn
// }
// function isTimesRecurrerJsonRepr(jsonRepr: Recurrer.JsonRepr): jsonRepr is TimesRecurrer.JsonRepr {
  // return jsonRepr.kind === Kind.Times
// }
// function isIntervalRecurrerJsonRepr(jsonRepr: Recurrer.JsonRepr): jsonRepr is IntervalRecurrer.JsonRepr {
//   return jsonRepr.kind === Kind.Interval
// }

export function initialize(jsonRepr: Recurrer.JsonRepr): Recurrer.Recurrer {
  if (isTimesRecurrerJsonRepr(jsonRepr)) {
    return new TimesRecurrer.Times({
      times: jsonRepr.times,
      recurrer: initialize(jsonRepr.recurrer)
    })
  }

  if (isDurationRecurrerJsonRepr(jsonRepr)) {
  // console.log("isDurationRecurrerJsonRepr:", jsonRepr)

    return new DurationRecurrer.DurationRecurrer({
      duration: Temporal.Duration.from(jsonRepr.interval),
      recurrer: initialize(jsonRepr.recurrer),
      timeLastApply: Temporal.Instant.from(jsonRepr.timeLastApply),
    })
  }

  return IdentityRecurrer.INSTANCE
  throw new TypeError("Unknown recurrer json repr.")
}