// import { Temporal } from 'npm:@js-temporal/polyfill'
import type * as Task from '../Task'

export interface Crg extends Task.Crg {
  isComplete: boolean
}
export interface NewArg extends Task.NewArg {
  // now: Temporal.Instant
}
export interface JsonRepr extends Task.JsonRepr {
  isComplete: boolean
}