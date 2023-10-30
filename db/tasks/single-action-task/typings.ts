import { Null, msec } from '/utility/ulib.ts'
import * as Task from '/db/tasks/task.ts'
import { Due } from '/db/dues.ts'
import { Temporal } from 'npm:@js-temporal/polyfill'

export interface Crg extends Task.Crg {
  due: Due.Due
  isComplete: boolean
  description: string
  creationInstant: Temporal.Instant
  completionInstant: Null<Temporal.Instant>
}
export interface NewArg extends Task.NewArg {
  due: Due.Due
  description: string
}
export interface JsonRepr extends Task.JsonRepr {
  due: Due.JsonRepr
  isComplete: boolean
  description: string
  creationInstant: string
  completionInstant: Null<string>
}