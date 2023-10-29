import { Kind } from "../common.ts"
import { JsonRepr } from "./typings.ts"
import { MaybePromise } from "/utility/ulib.ts"

export abstract class Recurrer {
  abstract get kind(): Kind
  abstract apply(): MaybePromise<unknown>
  abstract jsonify(): JsonRepr
}