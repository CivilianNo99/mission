import { Kind } from "../common.ts"
import { Action } from '../recurrer/typings.ts'
import { Temporal } from 'npm:@js-temporal/polyfill'
import { Recurrer } from "../recurrer.ts"
import { Crg, JsonRepr } from "./typings.ts"

export class TimesRecurrer extends Recurrer {
  private readonly times: number
  private readonly recurrer: Recurrer

  get kind() {
    return Kind.Times
  }

  constructor(arg: Crg) {
    super()
    this.times = arg.times
    this.recurrer = arg.recurrer
  }

  static new(times: number, recurrer: Recurrer) {
    return new TimesRecurrer({ times, recurrer })
  }

  async apply(now: Temporal.Instant, action: Action) {
    for (let i = 0; i < this.times; i++) {
      await this.recurrer.apply(now, action)
    }
  }

  jsonify(): JsonRepr {
    return {
      kind: this.kind,
      times: this.times,
      recurrer: this.recurrer.jsonify(),
    }
  }
}