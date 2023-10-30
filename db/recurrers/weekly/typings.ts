import * as Recurrer from '../recurrer.ts'
import { Temporal } from 'npm:@js-temporal/polyfill'

export interface Crg extends Recurrer.Crg {
  lastWeek: Temporal.Instant
  recurrer: Recurrer.Recurrer
}
export interface NewArg extends Recurrer.NewArg {
  recurrer: Recurrer.Recurrer
}
export interface JsonRepr extends Recurrer.JsonRepr {
  lastWeek: string
  recurrer: Recurrer.JsonRepr
}