import { Kind } from "../common.ts"
import { Recurrer } from "../recurrer.ts"
import { Apply, JsonRepr } from "./typings.ts"

export class FnRecurrer extends Recurrer {
  constructor(readonly apply: Apply) {
    super()
  }
  
  static new(action: Apply) {
    return new FnRecurrer(action)
  }
  
  get kind() {
    return Kind.Fn
  }
  
  jsonify(): JsonRepr {
    return {
      kind: Kind.Fn
    }
  }
}