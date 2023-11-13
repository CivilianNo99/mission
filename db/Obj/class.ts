import { Id } from '/db/id.ts'
import type { Crg, JsonRepr } from './typings.ts'

export class Obj {
  readonly id: Id

  constructor(crg: Crg) {
    this.id = crg.id
  }

  toJSON(): JsonRepr {
    return {
      id: this.id,
    }
  }

  destroy(): any {
    // noop
  }
}