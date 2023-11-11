import { Temporal } from 'npm:@js-temporal/polyfill'
import { Kind } from "../common.ts"

export type Action = (now: Temporal.Instant) => unknown
export interface Crg {}
export interface NewArg {}
export interface JsonRepr {
  kind: Kind
}