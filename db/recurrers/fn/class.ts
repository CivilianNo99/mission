import { Temporal } from 'npm:@js-temporal/polyfill'
import { Kind } from "../common.ts"
import { Action, Recurrer } from "../recurrer.ts"
import { JsonRepr } from "./typings.ts"

export class FnRecurrer extends Recurrer {
  constructor() {
    super()
  }
  
  get kind() {
    return Kind.Fn
  }
  
  apply(now: Temporal.Instant, action: Action) {
    return action(now)
  }
  
  jsonify(): JsonRepr {
    return {
      kind: Kind.Fn
    }
  }

  static new() {
    return new FnRecurrer()
  }
}

export const FN_RECURRER = FnRecurrer.new()