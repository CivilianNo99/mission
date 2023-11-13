import * as Task from "../Task/index.ts"

export interface Crg extends Task.Crg {
  timesActionPerformed: number
  timesActionMustBePerformed: number
}
export interface NewArg extends Task.NewArg {
  timesActionMustBePerformed: number
}
export interface JsonRepr extends Task.JsonRepr {
  timesActionPerformed: number
  timesActionMustBePerformed: number
}