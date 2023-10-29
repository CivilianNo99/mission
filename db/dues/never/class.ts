import * as Due from '../due.ts'
import { Kind } from '../common.ts'
import { JsonRepr } from './typings.ts'

export class NeverDue extends Due.Due {
  get kind(): Kind {
    return Kind.Never
  }

  get isDue() {
    return false
  }

  isDueIn(thing: any): boolean {
    return false
  }

  jsonify(): JsonRepr {
    return {
      kind: this.kind,
    }
  }
}