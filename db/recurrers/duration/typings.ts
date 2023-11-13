import type { Temporal } from 'npm:@js-temporal/polyfill'
import type * as Recurrer from '../Recurrer'

export interface Crg extends Recurrer.Crg {
  duration: Temporal.Duration
  recurrer: Recurrer.Recurrer
  timeLastApply: Temporal.Instant
}
export interface NewArg extends Recurrer.NewArg {
  now?: Temporal.Instant
  from?: Temporal.Instant
  // offset?: Temporal.Duration
  duration: Temporal.Duration
  recurrer?: Recurrer.Recurrer
}
export interface NewDailyArg {
  now: Temporal.Instant
  from?: {
    year?: number
    month?: number
    monthDay?: number
  }
  
  at?: {
    hour?: number
    minute?: number
    second?: number
  }

  recurrer: Recurrer.Recurrer
}
export interface NewWeeklyArg {
  now: Temporal.Instant

  from?: {
    year?: number
    week?: number
    month?: number
  }
  
  at?: {
    hour?: number
    minute?: number
    second?: number
    weekDay?: number
  }

  recurrer: Recurrer.Recurrer
}
export interface JsonRepr extends Recurrer.JsonRepr {
  interval: string
  recurrer: Recurrer.JsonRepr
  timeLastApply: string
}