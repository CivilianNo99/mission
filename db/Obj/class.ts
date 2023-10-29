import { Id } from '/db/id.ts'
import { Crg, JsonRepr } from './typings.ts'

export class Obj {
  readonly id: Id

  constructor(crg: Crg) {
    this.id = crg.id
  }

  jsonify(): JsonRepr {
    return {
      id: this.id,
    }
  }

  destroy(): any {
    // noop
  }
}