import { Temporal } from 'npm:@js-temporal/polyfill'
import { Kind } from "../common.ts"
import { Action, JsonRepr } from "./typings.ts"
import { MaybePromise } from "/utility/ulib.ts"

export abstract class Recurrer {
  abstract get kind(): Kind
  abstract apply(now: Temporal.Instant, action: Action): MaybePromise<unknown>
  abstract jsonify(): JsonRepr
}