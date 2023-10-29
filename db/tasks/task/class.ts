import { Id } from '/db/id.ts'
import { Kind } from '../common.ts'
import { Crg, JsonRepr } from './typings.ts'

export abstract class Task {
  readonly id: Id

  constructor(arg: Crg) {
    this.id = arg.id
  }

  abstract get kind(): Kind

  jsonify(): JsonRepr {
    return {
      id: this.id,
      kind: this.kind,
    }
  }
}