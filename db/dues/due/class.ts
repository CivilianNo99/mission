import { Kind } from "../common.ts"
import { Temporal } from "npm:@js-temporal/polyfill"
import { JsonRepr } from "./typings.ts"

export abstract class Due {
  abstract get kind(): Kind
  abstract get isDue(): boolean
  /** 
   * Whether the task will be due in a duration of {@param duration}.
   */
  abstract isDueIn(duration: Temporal.Duration): boolean
  /** 
   * Whether the task will be due at the time of {@param instant}.
   */
  abstract isDueAt(instant: Temporal.Instant): boolean
  abstract jsonify(): JsonRepr
}