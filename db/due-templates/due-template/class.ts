import { Due } from "/db/dues/due.ts"
import { Kind } from "../common.ts"
import { JsonRepr } from "./typings.ts"

export abstract class DueTemplate {
  abstract get kind(): Kind
  abstract create(): Due

  jsonify(): JsonRepr {
    return {
      kind: this.kind,
    }
  }
}