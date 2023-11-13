import type { Temporal } from 'npm:@js-temporal/polyfill'
import type { Kind } from "../common.ts"
import type { Action, JsonRepr } from "./typings.ts"
import type { MaybePromise } from "/utility/ulib.ts"

export abstract class Recurrer {
  abstract get kind(): Kind
  abstract apply(now: Temporal.Instant, action: Action): MaybePromise<unknown>
  abstract toJSON(): JsonRepr
}