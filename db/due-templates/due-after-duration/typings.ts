import { Temporal } from "npm:@js-temporal/polyfill"
import * as DueTemplate from '../due.ts'

export interface Crg extends DueTemplate.Crg {
  duration: Temporal.Duration
}
export interface JsonRepr extends DueTemplate.JsonRepr {
  duration: string
}