import { Due } from '../due.ts'
import { Kind } from '../common.ts'
import { JsonRepr } from './typings.ts'
import { Temporal } from 'npm:@js-temporal/polyfill'

export class NeverDue extends Due {
  get kind() {
    return Kind.NeverDue
  }

  get isDue() {
    return false
  }

  isDueIn(duration: Temporal.Duration) {
    return false
  }

  isDueAt(instant: Temporal.Instant) {
    return false
  }

  jsonify(): JsonRepr {
    return {
      kind: this.kind,
    }
  }
}