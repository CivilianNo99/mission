import { Null } from "/utility/ulib.ts"
import { Temporal } from "npm:@js-temporal/polyfill"
import * as Due from "/db/dues/due.ts"
import * as Task from "../task.ts"

export interface Crg extends Task.Crg {
  due: Due.Due
  expiry: Due.Due
  completedAt: Null<Temporal.Instant>
  timesActionPerformed: number
  timesActionMustBePerformed: number
}
export interface NewArg extends Task.NewArg {
  due: Due.Due
  expiry: Due.Due
  timesActionMustBePerformed: number
}
export interface JsonRepr extends Task.JsonRepr {
  due: Due.JsonRepr
  expiry: Due.JsonRepr
  completedAt: Null<string>
  timesActionPerformed: number
  timesActionMustBePerformed: number
}