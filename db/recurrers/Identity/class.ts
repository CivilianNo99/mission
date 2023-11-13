import { Kind } from "../common"
import { type Action, Recurrer } from "../Recurrer"
import type { Temporal } from 'npm:@js-temporal/polyfill'
import type { JsonRepr } from "./typings.ts"

export class IdentityRecurrer extends Recurrer {
  private constructor() {
    super()
  }
  
  get kind() {
    return Kind.Fn
  }
  
  apply(now: Temporal.Instant, action: Action) {
    return action(now)
  }
  
  toJSON(): JsonRepr {
    return {
      kind: Kind.Fn
    }
  }

  /** 
   * This recurrer is so simple it only has one instance: There is no need to 
   * create more. 
  */
  static readonly INSTANCE = new IdentityRecurrer()
}