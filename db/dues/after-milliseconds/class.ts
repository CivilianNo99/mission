import { Now } from '/utility/time.ts'
import { Kind } from '../common.ts'
import * as Due from '../due.ts'
import { Crg, JsonRepr } from './typings.ts'

/**
 * This obj is due after `dueAfter` milliseconds form the time it was created,
 * which is `from`.
 * 
 * Serves both as due and as due template.
 */
export class DueAfterMilliseconds extends Due.Due {
  from: number
  dueAfter: number

  constructor(arg: Crg) {
    super()
    this.from = arg.from
    this.dueAfter = arg.dueAfter
  }

  get kind(): Kind {
    return Kind.AfterMilliseconds
  }

  get isDue() {
    return Now() - this.from >= this.dueAfter
  }

  isDueIn(thing: any): boolean {
    return true
  }

  clone() {
    return new DueAfterMilliseconds({
      from: Now(),
      dueAfter: this.dueAfter,
    })
  }

  jsonify(): JsonRepr {
    return {
      kind: this.kind,
      from: this.from,
      dueAfter: this.dueAfter,
    }
  }
}