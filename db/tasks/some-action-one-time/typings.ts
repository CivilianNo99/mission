import { Temporal } from 'npm:@js-temporal/polyfill'
import * as Task from '/db/tasks/task.ts'

export interface Crg extends Task.Crg {
  isComplete: boolean
}
export interface NewArg extends Task.NewArg {
  now: Temporal.Instant
}
export interface JsonRepr extends Task.JsonRepr {
  isComplete: boolean
}