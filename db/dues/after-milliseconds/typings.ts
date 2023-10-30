import * as Due from '../due.ts'
import { Temporal } from 'npm:@js-temporal/polyfill'

export interface Crg extends Due.Crg {
  due: Temporal.Instant
}
export interface JsonRepr extends Due.JsonRepr {
  due: string
}