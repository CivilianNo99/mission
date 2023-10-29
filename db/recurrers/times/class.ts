import { Kind } from "../common.ts"
import { range } from "/utility/ulib.ts"
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

  async apply() {
    for (const _ of range(this.times)) {
      await this.recurrer.apply()
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