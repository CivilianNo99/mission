import * as Due from '../due.ts'
import { Kind } from '../common.ts'
import { Crg, JsonRepr } from './typings.ts'

/** Serves both as due and as due template */
export class DueAtMillisecond extends Due.Due {
  at: number

  constructor(arg: Crg) {
    super()
    this.at = arg.at
  }

  get kind(): Kind {
    return Kind.AtMillisecond
  }

  get isDue() {
    return 0 >= this.at
  }

  isDueIn(thing: any): boolean {
    return true
  }

  jsonify(): JsonRepr {
    return {
      at: this.at,
      kind: this.kind,
    }
  }

  clone() {
    return new DueAtMillisecond({ at: this.at })
  }
}