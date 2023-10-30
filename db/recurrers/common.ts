import { Temporal } from 'npm:@js-temporal/polyfill'
import * as Recurrer from './recurrer.ts'
import * as FnRecurrer from './fn.ts'
import * as TimesRecurrer from './times.ts'
import * as IntervalRecurrer from './interval.ts'
import * as DailyRecurrer from './daily.ts'
import * as WeeklyRecurrer from './weekly.ts'

export enum Kind {
  Fn,
  Times,
  Interval,
  Daily,
  Weekly,
}

function isFnRecurrerJsonRepr(jsonRepr: Recurrer.JsonRepr): jsonRepr is FnRecurrer.JsonRepr {
  return jsonRepr.kind === Kind.Fn
}
function isTimesRecurrerJsonRepr(jsonRepr: Recurrer.JsonRepr): jsonRepr is TimesRecurrer.JsonRepr {
  return jsonRepr.kind === Kind.Times
}
function isIntervalRecurrerJsonRepr(jsonRepr: Recurrer.JsonRepr): jsonRepr is IntervalRecurrer.JsonRepr {
  return jsonRepr.kind === Kind.Interval
}
function isDailyRecurrerJsonRepr(jsonRepr: Recurrer.JsonRepr): jsonRepr is DailyRecurrer.JsonRepr {
  return jsonRepr.kind === Kind.Daily
}
function isWeeklyRecurrerJsonRepr(jsonRepr: Recurrer.JsonRepr): jsonRepr is WeeklyRecurrer.JsonRepr {
  return jsonRepr.kind === Kind.Weekly
}
// function isFnRecurrerNewArg(arg: Recurrer.NewArg): arg is FnRecurrer.NewArg {
//   return arg.kind === Kind.Fn
// }
// function isTimesRecurrerJsonRepr(jsonRepr: Recurrer.JsonRepr): jsonRepr is TimesRecurrer.JsonRepr {
  // return jsonRepr.kind === Kind.Times
// }
// function isIntervalRecurrerJsonRepr(jsonRepr: Recurrer.JsonRepr): jsonRepr is IntervalRecurrer.JsonRepr {
//   return jsonRepr.kind === Kind.Interval
// }

export function initialize(jsonRepr: Recurrer.JsonRepr, action: FnRecurrer.Apply): Recurrer.Recurrer {
  if (isWeeklyRecurrerJsonRepr(jsonRepr)) {
    return new WeeklyRecurrer.Weekly({
      lastWeek: new Temporal.Instant(BigInt(jsonRepr.lastWeek)),
      recurrer: initialize(jsonRepr.recurrer, action)
    })
  }
  if (isDailyRecurrerJsonRepr(jsonRepr)) {
    return new DailyRecurrer.Daily({
      lastDay: jsonRepr.lastDay,
      recurrer: initialize(jsonRepr.recurrer, action)
    })
  }
  
  if (isTimesRecurrerJsonRepr(jsonRepr)) {
    return new TimesRecurrer.Times({
      times: jsonRepr.times,
      recurrer: initialize(jsonRepr.recurrer, action)
    })
  }

  if (isIntervalRecurrerJsonRepr(jsonRepr)) {
    return new IntervalRecurrer.Interval({
      interval: jsonRepr.interval,
      prevApply: jsonRepr.prevApply,
      recurrer: initialize(jsonRepr.recurrer, action),
    })
  }

  return new FnRecurrer.Fn(action)
}

// export function create(arg: Recurrer.Crg, action: FnRecurrer.Apply): Recurrer.Recurrer {
//   if (isTimesRecurrerJsonRepr(arg)) {
//     return new TimesRecurrer.Times({
//       times: arg.times,
//       recurrer: initialize(arg.recurrer, action)
//     })
//   }

//   if (isIntervalRecurrerJsonRepr(arg)) {
//     return new IntervalRecurrer.Interval({
//       interval: arg.interval,
//       prevApply: arg.prevApply,
//       recurrer: initialize(arg.recurrer, action),
//     })
//   }

//   return new FnRecurrer.Fn(action)
// }

// export function createAny(arg: Recurrer.) {

// }